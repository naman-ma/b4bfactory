const models = require('../../models/master');
const Service = models.services;
const uuid = require('uuid/v1');

module.exports = class SuperAdminService {

  constructor() {

  }

  /**
   * @params request
   * @for adding a new service
   */
  addService(req) {
    if (!req.body.database_name) {
      throw new Error('Database name not received!');
    }

    if (!req.body.database_url) {
      throw new Error('Database url not received!');
    }

    // Create a service
    const service = {
      uid: uuid(),
      database_name: req.body.database_name,
      database_url: req.body.database_url
    };

    // Save service in the database
    return Service.create(service)
      .then(data => {
        return data
      })
   
  };

  /**
   * return all the list of added platforms(Service)
   */
  getAllPlatforms() {
    return Service.findAll({})
      .then(result => {
        return result
      })
  }

  /**
   * Updates service(platform)
   * 
   * @param  {Object} data
   * @return {Object}
   */
  async updatePlatformStatus(body) {

    if (!body.id) {
      throw new Error('Database id not received!');
    }

    let platform = await Service.findOne({
      where: {
        uid: body.id
      }
    });

    if (!platform) {
      throw new Error('Service with this id doesn\'t exists!');
    }

    if (body.flag !== '') {
      platform.status = body.flag;
      await platform.save();
    }

    return platform.reload();
  }

};
