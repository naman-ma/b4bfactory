const formidable = require('formidable');
const UserService = require('../services/UserService');
const UserRepository = require('../repositories/user.repository');

const parse = async (req) => {
  const form = new formidable.IncomingForm();
  return new Promise((resovle, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      resovle({ fields, files });
    });
  });
}

module.exports = (function () {

  const Service = new UserService;

  /**
    * Adapter for sending response depending on the response received from repository layer
    * 
    * @param {Array} param 
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
   * get all users
   */
  this.getAllUsers = async (req, res, next) => {

    try {
      const userRepository = new UserRepository;

      let { query } = req;
      if (query.data) {
        query = JSON.parse(query.data);
      }

      let response = await userRepository.paginate(query, 'en');

      return _respond([null, response], res, "All Users!");
      // ReS(res, { payload: getAllUsers, message: "All Users!" }, 200);
    } catch (error) {
      return _respond([error], res, "admin.module >> user.controller >> getAllUsers method");
      // ReE(res, error, 422, 'admin.module >> user.controller >> getAllUsers method');
    }
  }

  /**
    * get user details
    */
  this.getUserDetails = async (req, res, next) => {

    try {
      const userRepository = new UserRepository;

      const { params } = req;
      let response = await userRepository.getUserDetails(params);

      ReS(res, {
        payload: response,
        message: "User details!"
      }, 200);
    } catch (error) {
      ReE(res, error, 422, 'admin.module >> user.controller >> getUserDetails method');
    }
  }

  /**
   * update user details
   */
  this.updateUserDetails = async (req, res, next) => {

    try {
      const { fields, files } = await parse(req);
      const updateUser = await Service.updateUser({ uid: req.uid, fields, files });

      ReS(res, {
        payload: updateUser,
        message: "User details updated!"
      }, 200);
    } catch (error) {
      ReE(res, error, 422, 'admin.module >> user.controller >> updateUserDetails method');
    }

  }

  this.sendWarningMail = async (req, res, next) => {

    try {
      const userRepository = new UserRepository;

      const { body } = req;
      let response = await userRepository.sendWarningMail(body);

      ReS(res, {
        payload: response,
        message: "Warning email successfully sent to the user!"
      }, 200);
    } catch (error) {
      ReE(res, error, 422, 'admin.module >> user.controller >> sendWarningMail method');
    }

  }

  /**
    * get allUsersCount
    */
  this.getAllUsersCount = async (req, res, next) => {

    try {
      const userRepository = new UserRepository;
      let response = await userRepository.getAllUsersCount();

      ReS(res, {
        payload: response,
        message: "All users count!"
      }, 200);
    } catch (error) {
      ReE(res, error, 422, 'admin.module >> user.controller >> getAllUsersCount method');
    }
  }

  return this;

})();
