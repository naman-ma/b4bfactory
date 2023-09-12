const AuthService = require('../services/AuthService');
const UserRepository = require('../repositories/user.repository');


module.exports = (function () {

  const Service = new AuthService;

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
        status: false,
        message: err.message
      }).status(500);
    }

    return res.json({
      status: true,
      payload: list,
      message
    });

  }

  /**
   * user register 
   */
  this.register = async (req, res, next) => {
    try {
      const userRepository = new UserRepository;

      const register = await Service.register(req);

      return _respond([null, register], res, "Registered successfully!");
      // ReS(res, {
      //   payload: register,
      //   message: "Registered successfully!"
      // }, 200);

    } catch (error) {

      return _respond([error], res, "auth.module >> auth.controller >> register method");
      // ReE(res, error, 422, 'auth.module >> auth.controller >> register method');
    }
  }
  

  /**
   * user login
   */
  this.login = async (req, res, next) => {

    try {
      const userRepository = new UserRepository;

      const login = await userRepository.login(req);

      res.socket.on('connect', function () {
        res.socket.emit('custom', 'Hao!')
      })
      // console.log('res.socket: ', res.socket);
      // console.log('62-- controller--login: ', login);

      ReS(res, {
        payload: login,
        message: "Logged in successfully!"
      }, 200);

    } catch (error) {
      ReE(res, error, 422, 'auth.module >> auth.controller >> login method');
    }
  }


  /**
   * user forget-password
   */
  this.forgetPassword = async (req, res, next) => {

    try {
      const userRepository = new UserRepository;

      let response = await userRepository.forgetPassword(req.body);

      ReS(res, {
        payload: response,
        message: "A mail containing password reset link is sent to your registered mail!"
      }, 200);

    } catch (error) {
      ReE(res, error, 422, 'auth.module >> auth.controller >> forgetPassword method');
    }
  }


  /**
   * user reset-password
   */
  this.resetPassword = async (req, res, next) => {

    try {
      const userRepository = new UserRepository;

      let response = await userRepository.resetPassword(req.body);

      ReS(res, {
        payload: response,
        message: "Your password has been updated successfully!"
      }, 200);

    } catch (error) {
      ReE(res, error, 422, 'auth.module >> auth.controller >> resetPassword method');
    }
  }


  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  this.getUserLocationMeta = async (req, res, next) => {
    try {
      const userRepository = new UserRepository;

      const { params } = req;
      let response = await userRepository.getUserLocationMeta(params);

      ReS(res, {
        payload: response,
        message: "User meta details!"
      }, 200);

    } catch (error) {
      ReE(res, error, 422, 'auth.module >> auth.controller >> getUserLocationMeta method');
    }
  }

  return this;

})();
