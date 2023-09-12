const CategoryRepository = require('../repositories/categories.repository');

module.exports = (function () {


  /**
   * Adapter for sending response depending on the response received from service layer.
   * 
   * @param {Array} param0 
   * @param {Object} res 
   * @param {string} message 
   * @return {JSON} res
   */
  let _respond = ([err, list], res, message = '') => {

    if (err) {
      return res.json({
        success: false,
        message: err.message
      }).status(500);
    }

    return res.json({
      success: true,
      payload: list,
      message
    });
  }


  /**
   * add new category
   */
  this.addCategory = async (req, res, next) => {
    try {
      const categoryRepository = new CategoryRepository;

      const { body } = req;
      let response = await categoryRepository.addCategory(body);

      return _respond([null, response], res, "Category added successfully!");
    } catch (error) {
      return _respond([error], res, "admin.module >> category.controller >> addCategory method");
    }

  }

  /**
   * get all categories
   */
  this.getAllCategories = async (req, res, next) => {

    try {
      const categoryRepository = new CategoryRepository;

      let { query } = req;
      if (query.data) {
        query = JSON.parse(query.data);
      }

      let response = await categoryRepository.paginate(query);

      return _respond([null, response], res, "All Categories!");
    } catch (error) {
      return _respond([error], res, "admin.module >> category.controller >> getAllCategories method");
    }
  }

  /**
   * get user details
   */
  this.getCategoryDetails = async (req, res, next) => {

    try {
      const categoryRepository = new CategoryRepository;

      const { params } = req;
      let response = await categoryRepository.getCategoryDetails(params);

      ReS(res, {
        payload: response,
        message: "Category details!"
      }, 200);
    } catch (error) {
      ReE(res, error, 422, 'admin.module >> category.controller >> getCategoryDetails method');
    }
  }


  /**
    * get allCategoriesCount
    */
  this.getAllCategoriesCount = async (req, res, next) => {

    try {
      const categoryRepository = new CategoryRepository;

      let response = await categoryRepository.getAllCategoriesCount();

      ReS(res, {
        payload: response,
        message: "All categories count!"
      }, 200);
    } catch (error) {
      ReE(res, error, 422, 'admin.module >> category.controller >> getAllCategoriesCount method');
    }
  }

  return this;

})();