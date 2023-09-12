const PlatformService = require('../services/PlatformService');

module.exports = (function () {

  const Service = new PlatformService;

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
   * get all settings
   */
  this.allSettings = async (req, res, next) => {
    try {
      const allSettings = await Service.getAllSettings();

      return _respond([null, allSettings], res, "All settings!");
    } catch (error) {

      return _respond([error], res, "admin.module >> platform.controller >> allSettings method");
    }
  }

  /**
   * addSettings
   */
  this.addSetting = async (req, res, next) => {
    try {
      const { body } = req;
      const addSetting = await Service.addSetting(body);

      return _respond([null, addSetting], res, "Settings saved successfully!");
      // ReS(res, { payload: addSetting, message: "Settings saved successfully!" }, 200);
    } catch (error) {
      return _respond([error], res, "admin.module >> platform.controller >> addSetting method");
      // ReE(res, error, 422, 'admin.module >> platform.controller >> addSetting method');
    }
  }

  /**
   * update the settings
   */
  this.updateSetting = async (req, res, next) => {
    try {
      const { body } = req;
      let updateSetting = await Service.updateSetting(body);

      ReS(res,
        {
          payload: updateSetting,
          message: "Updated settings successfully!"
        },
        200
      );
    } catch (error) {
      ReE(res, error, 422, 'admin.module >> platform.controller >> updateSetting method');
    }
  }

  return this;

})();