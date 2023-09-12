const AbstractRepository = require('../../extends/abstract/abstract.repository');

module.exports = class CategoryMetasRepository extends AbstractRepository {

  setModel() {
    return 'category_metas';
  }

}