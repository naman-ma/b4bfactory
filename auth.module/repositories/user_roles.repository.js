const AbstractRepository = require('../../extends/abstract/abstract.repository');

module.exports = class UserRolesRepository extends AbstractRepository {

    // constructor() {
    //     super();
    // }

    setModel() {
        return 'user_roles';
    }

}