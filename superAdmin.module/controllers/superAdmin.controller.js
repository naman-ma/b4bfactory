const SuperAdminService = require('../services/superAdminService');

module.exports = (function () {

  const Service = new SuperAdminService;

  /**
   * add new service in database
   */
  this.addService = async (req, res, next) => {
    try {
      const addService = await Service.addService(req);

      ReS(res,
        {
          payload: addService,
          message: "New service added successfully!"
        },
        200
      );
    } catch (error) {
      ReE(res, error, 422, 'superAdmin.module controller >>>> addService method');
    }
  }

  /**
   * returns all platforms present in the db[{}] 
   */
  this.allPlatforms = async (req, res, next) => {
    try {
      let allPlatforms = await Service.getAllPlatforms(req);

      ReS(res,
        {
          payload: allPlatforms,
          message: "All platforms list!"
        },
        200
      );
    } catch (error) {
      ReE(res, error, 422, 'superAdmin.module controller >>>> allPlatforms method');

    }
  }

  /**
   * update the platform(service) status
   */
  this.updatePlatformStatus = async (req, res, next) => {
    try {
      const { body } = req;
      let updatePlatformStatus = await Service.updatePlatformStatus(body);

      ReS(res,
        {
          payload: updatePlatformStatus,
          message: "Updated platform status successfully!"
        },
        200
      );
    } catch (error) {
      ReE(res, error, 422, 'superAdmin.module controller >>>> updatePlatformStatus method');
    }
  }

  return this;

})();