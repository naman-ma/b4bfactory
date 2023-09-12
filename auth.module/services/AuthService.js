const uuid = require('uuid/v1');
const models = require('../../models/slave');
const Users = models.users;
const UserRoles = models.user_roles;
const UserHasRoles = models.user_has_roles;
const messages = require('../../constants/messages');
const Roles = require('../../constants/roles');
const { generate } = require('../../helpers/jwtToken');

module.exports = class AuthService {

  constructor() {

  }

  /**
   * @param {*} req: request object
  */
  async register(req) {

    // Validate for params received
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.roles) {
      throw new Error(messages.VALIDATION_ERROR);
    }

    // check if email exists
    let emailExists = await Users.findOne({
      where: {
        email: req.body.email
      }
    });

    if (emailExists) {
      throw new Error(messages.ACCOUNT_EXISTS);
    }

    let createObject = {  
      uid: uuid(),
      first_name: req.body.first_name.toLowerCase(),
      last_name: req.body.last_name.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      role_id: 1
    };

    // save the user details in the database
    const registeredUser = await Users.create(createObject);

    if (req.body.roles && Array.isArray(req.body.roles)) {
      for (let i = 0; i < req.body.roles.length; i++) {

        // get the role id from the role name
        let role = await UserRoles.findOne({
          where: {
            name: req.body.roles[i]
          },
          raw: true
        });

        if (role) {
          // save the user_has_role relation (user_id and role_id)
          await UserHasRoles.create({
            user_id: registeredUser.id,
            role_id: role.id,
          });
        }

      }
    }

    return registeredUser
  }


  /** 
   * @param {*} req: request object
  */
  async login(req) {
    console.log('req.body: ', req.body);

    if (!req.body.email) {
      throw new Error(messages.EMAIL_NOT_FOUND);
    }

    if (!req.body.password) {
      throw new Error(messages.PASSWORD_NOT_FOUND);
    }

    // check user details received in the database
    const userDetails = await Users.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!userDetails) {
      throw new Error('User with this email not found!');
    }

    let userPasswordMatched = await userDetails.comparePassword(req.body.password);

    if (!userPasswordMatched) {
      throw new Error(messages.PASSWORDS_NOT_MATCHING);
    } else {

      const payload = {
        id: userDetails.id,
        user: userDetails.email,
        uid: userDetails.uid,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
      };
      console.log('payload: ', payload);

      if (req.body.isAdmin) {
        const userRole = await UserRoles.findOne({
          where: {
            name: Roles.ROLES.ADMIN
          },
          raw: true
        });

        const userHasRole = await UserHasRoles.findOne({
          where: {
            user_id: userDetails.id,
            role_id: userRole.id
          },
          raw: true
        });

        if (!userHasRole) {
          throw new Error(messages.NOT_HAVE('admin'));
        }
      }

      return {
        access_token: generate(payload),
        userDetails,
        mkc : true
      };

    }

  }


}
