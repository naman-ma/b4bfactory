const uuid = require('uuid/v1');
const AbstractRepository = require('../../extends/abstract/abstract.repository');
const CategoryMetasRepository = require('./category_metas.repository');

module.exports = class CategoryRepository extends AbstractRepository {

  constructor() {
    super();
  }

  setModel() {
    return 'categories';
  }

  setRelations() {
    return ['category_metas'];
  }

  async addCategory(body) {

    if (!body.category_name_en) {
      throw new Error('Category name not received!');
    }

    // check if category exists
    let categoryExists = await this.findOne({
      where: {
        category_name: body.category_name_en
      }
    });

    if (categoryExists) {
      throw new Error('Category by this name already exists!');
    }

    // check if parent category exists
    let parentCategoryExists = await this.findOne({
      where: {
        category_name: body.parent
      }
    });

    // Create a category object
    const categoryObj = {
      uid: uuid(),
      category_name: body.category_name_en,
      parent_id: parentCategoryExists ? parentCategoryExists.id : null
    };

    let category = await this.create(categoryObj);

    if (!category) {
      // throw
    }

    // now insert in category_metas table
    let categoryMeta;

    if (body.category_name_en) {
      // Create a category_metas_en object
      const categoryMetaObjEn = {
        category_id: category.id,
        type_defination: 'category_name',
        type: 'TRANSLATION',
        type_value: body.category_name_en,
        type_option: 'en'
      };

      categoryMeta = await this.relations.category_metas.create(categoryMetaObjEn);
    }

    if (body.category_name_fr) {
      // Create a category_metas_fr object
      const categoryMetaObjFr = {
        category_id: category.id,
        type_defination: 'category_name',
        type: 'TRANSLATION',
        type_value: body.category_name_fr,
        type_option: 'fr'
      };

      categoryMeta = await this.relations.category_metas.create(categoryMetaObjFr);
    }

    return categoryMeta
  }

  /**
   * Fetches all categories
   * 
   * @param  {Object} query
   *
   * @throws {Error}
   * @return {Object}
   */
  async paginate(query = {}, language) {
    let where = {}, order = [], opts = {};

    // this.setLanguage(query.language ? query.language : 'en');

    if (query.sort) {
      order.push([query.sort.field, query.sort.order]);
    }

    let total = await this.count();

    if (query.search) {
      where = this.model.sequelize.literal(
        ` concat_ws(' ',category_name) like '%${query.search}%'`);
    }

    opts = {
      // attributes: [],
      where,
      order
    }

    let filtered = await this.count(opts);

    if (query.paginate) {
      opts.limit = query.paginate.limit;
      opts.offset = query.paginate.offset;
    }

    let rows = await this.findAll(opts);

    return {
      rows,
      paginate: {
        ...query.paginate,
        filtered,
        total
      }
    }
  }

  /**
   * 
   * @returns  {params.uid}
   * @throws {Error}
   */
  async getCategoryDetails(params) {
    const _decodeId = Buffer.from(params.id, 'base64').toString();

    if (!_decodeId) {
      throw new Error('Category Id not received!');
    }

    // check category details with the id received
    const categoryDetails = await this.findOne({
      where: {
        uid: _decodeId
      },
      include: [
        {
          model: this.relations.category_metas,
          as: 'metas'
        }
      ]
    });

    if (!categoryDetails) {
      throw new Error('categoryDetails not found!');
    }

    return categoryDetails
  }

  /**
   * 
   * @returns category count 
   * @throws {Error}
   */
  async getAllCategoriesCount() {
    const categoryCount = await this.count();

    if (!categoryCount) {
      throw new Error('Categories not found!');
    }

    return categoryCount
  }

  async mutateLanguage(row) {
    // let meta = await row.getMetas();
    // console.log('meta: ', meta);

    // Get meta with type translation
    // loop
    // loop languages 
    // flat object
    // let translations = meta.getTranslations({
    //   where: {
    //     language: this.language
    //   }
    // });
    // console.log('translations: ', translations);

    // Extract translation from model -> model_meta -> translation

    // if language found => Mutate available columns as column -> {column}_local || model.column -> {column}_local

    // set in row.dataValues so that returns to front

    return row;
  }

}