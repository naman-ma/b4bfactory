const path = require('path');
const slave = require('../../models/slave');
const master = require('../../models/master');

/**
 * Abstract repositiry for providing common crud functions to other extended repositories
 *
 * @requires {Class} Another class to extends this class. Cannot be used seperately
 */
module.exports = class AbstractRepository {

  /**
   * Instance of the SQL model.
   */
  model;

  /**
   * Relations collections.
   */
  relations = {};

  /**
   * Locked properties
   */
  locked = ['id', 'password'];

  language;

  constructor() {
    this._bindModel();

    this._mutateDate = this._mutateDate.bind(this);
    this._mutator = this._mutator.bind(this);
  }

  /**
   * Binds relations on the model on current object
   *
   * @param {Object} relations
   */
  setRelations() {
    return []
  }

  /**
   * Binds model to the current object.
   */
  _bindModel() {
    let modelName = this.setModel();
    let control = this.setControl();
    let relations = this.setRelations();

    if (!modelName) {
      throw new Error('Please set a model to this repository!');
    }

    if (control === 'slave' && slave) {
      relations.map(relation => {
        if (slave[relation]) {
          this.relations[relation] = slave[relation];
        }
      });
      return this.model = slave[modelName];
    }

    if (control === 'master' && master) {
      relations.map(relation => {
        if (master[relation]) {
          this.relations[relation] = master[relation];
        }
      });
      return this.model = master[modelName];
    }

    throw new Error(`No model defination found for ${modelName}`);
  }

  setControl() {
    return 'slave';
  }

  setLanguage(lang) {
    this.language = lang || 'en';
  }

  /**
   * Function to define the model
   *
   * @returns {String} Name of file with target model.
   */
  setModel() { }


  /**
   * Finds all data with the specified filters
   *
   * @param {Object} Filters Object containing key value pairs for matching the modal
   * @returns {Array}
   *
   */
  findAll(options = null) {
    return this.model.findAll(options || {})
      .then(this._mutator)
  }


  /**
   * Find single object with specified filters.
   *
   * @param {Object} filter Object containing key value pairs for matching the modal
   * @returns {Object|Boolean}
   *
   */
  findOne(options) {
    return this.model.findOne(options || {})
      .then(this._mutator);
  }

  /**
   * Finds by uuid(id)
   *
   * @param {String} uuid
   * @returns {Object|Boolean}
   */
  findByUuid(uuid) {
    return this.model.findOne({
      where: {
        uid: uuid
      }
    }).then(this._mutator);

  }

  /**
   * Fetches full length of current model
   */
  count(query = null) {
    return this.model.count(query || {});
  }


  /**
   * Creates a new row entry with provided data
   *
   * @param {Object} data
   * @returns {Object|Boolean}
   *
   */
  create(data) {
    return this.model.create(this._accessor(data))
      .then(this._mutator);
  }

  /**
   * Updates existing row with new values
   *
   * @param {Object} query Accepts object container all the values
   *
   * @returns {Object}
   * @throws {Error} err
   */
  update(query, data) {
    return this.model.update(query, this._accessor(data))
      .then(this._mutator);
  }

  createOrUpdate(query, insert) {
    // Find with query

    // If found update

    // If not found create

    // return row;
  }

  findOrFail() { }

  findOrCreate() { }

  /**
   * Deletes an existing row
   *
   */
  destroy(query) {
    return this.model.destroy(query);
  }

  _accessor(row) {
    // before insert mutate data
    return row;
  }

  async _mutator(row) {

    if (Array.isArray(row)) {
      for (let i = 0; i < row.length; i++) {
        row[i] = this._mutateDate(row[i]);
        row[i].dataValues.extra = 'true';
        row[i] = await this.mutateLanguage(row[i]);
        return row;
      }
    }

    if (row) {
      row = this._mutateDate(row);
      if (row && !row.dataValues) {
        row.extra = 'true';
      } else {
        row.dataValues.extra = 'true';
      }
      row = await this.mutateLanguage(row);
    }

    return row;
  }

  _mutateDate(row) {
    if (row) {

      if (row && !row.dataValues) {
        row.created_at_tz = new Date(row.createdAt);
      } else {
        row.dataValues.created_at_tz = new Date(row.dataValues.createdAt);
      }

    }
    return row;
  }

  async mutateLanguage(row) {
    // row.dataValues.language = 'en'
    return row;
  }

}
