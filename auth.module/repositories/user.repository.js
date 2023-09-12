import {users} from "../../models/slave/users.js"
const jwt = require('jsonwebtoken');
const countriesList = require("countries-list");

const AbstractRepository = require('../../extends/abstract/abstract.repository');
const UserRolesRepository = require('../repositories/user_roles.repository');
const messages = require('../../constants/messages');
const Mailer = require('../../utils/email');
const Roles = require('../../constants/roles');
const { generate } = require('../../helpers/jwtToken');


const createToken = function ({ email }) {
    return jwt.sign({ email: email, timestamp: Date.now() },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.RESET_TOKEN_EXPIRATION // expires in 1 hours
        }
    );
}

module.exports = class UserRepository extends AbstractRepository {

    constructor() {
        super();
    }

    setModel() {
        return 'users';
    }

    setRelations() {
        return ['user_has_roles'];
    }

    /**
     * @param {*} req: request object
     */
    async register(req) {
        debugger
        console.log("users =====>>>>>".users)
        // Validate for params received
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.roles) {
            throw new Error(messages.VALIDATION_ERROR);
        }

        // check if email exists
        let emailExists = await this.model.findOne({
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
        const registeredUser = await this.model.create(createObject);

        if (req.body.roles && Array.isArray(req.body.roles)) {
            const userRolesRepository = new UserRolesRepository;

            for (let i = 0; i < req.body.roles.length; i++) {

                // get the role id from the role name
                let role = await userRolesRepository.findOne({
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
        const userRolesRepository = new UserRolesRepository;

        if (!req.body.email) {
            throw new Error(messages.EMAIL_NOT_FOUND);
        }

        if (!req.body.password) {
            throw new Error(messages.PASSWORD_NOT_FOUND);
        }

        // check user details received in the database
        const userDetails = await this.model.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userDetails) {
            throw new Error('User with this email not found!');
        }

        let userPasswordMatched = await userDetails.comparePassword(req.body.password);
        // let userPasswordMatched =  false;

        if (!userPasswordMatched) {
            throw new Error(messages.PASSWORDS_NOT_MATCHING);
        } else {

            if (req.body.isAdmin) {
                const userRole = await userRolesRepository.findOne({
                    where: {
                        name: Roles.ROLES.ADMIN
                    },
                    raw: true
                });

                const userHasRole = await this.relations.user_has_roles.findOne({
                    where: {
                        user_id: userDetails.id,
                        role_id: userRole.id
                    },
                    // raw: true
                });

                if (!userHasRole && false) {
                    throw new Error(messages.NOT_HAVE('admin'));
                }
            }

            // find the logged in user roles
            const userRoles = await this.relations.user_has_roles.findAll({
                where: {
                    user_id: userDetails.id
                },
                include: [
                    {
                        model: userRolesRepository.model,
                        as: 'user_has_role_name',
                        attributes: ['name']
                    }
                ],
                raw: true
            });


            let loggedInUserRoles = [];
            if (userRoles && userRoles.length > 0) {
                for (let idx = 0; idx < userRoles.length; idx++) {
                    loggedInUserRoles.push(userRoles[idx]['user_has_role_name.name'])
                }
            }

            const payload = {
                id: userDetails.id,
                user: userDetails.email,
                uid: userDetails.uid,
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
                profile_pic: userDetails.profile_pic,
                role: loggedInUserRoles
            };

            return {
                access_token: generate(payload),
                // access_token: generate({usernameL:"chintu",password:"4654"}),
                userDetails
            };

        }
    }


    /**
     * Sends email with token
     *
     * @param {String} email user email
     * @returns {Object}
     */
    async forgetPassword({ email }) {

        if (email == "" || email == {} || email.lengh == 0 || !email) {
            throw new Error(messages.EMAIL_NOT_FOUND);
        }

        email = email.toLowerCase();
        let exists = await this.model.findOne(
            {
                where: {
                    email: email
                }
            }
        );

        if (!exists) {
            throw new Error(messages.ACCOUNT_NOT_FOUND);
        }

        let emailFactory = new Mailer();

        let htmlToSend = await emailFactory.buildTemplate('user_reset_password.html',
            {
                actionUrl: process.env.APP_URL + "/reset-password/" + createToken({ email }),
                app: process.env.APP
            }
        );

        var mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Reset password email',
            html: htmlToSend
        }

        // send email to user with reset password link
        let response = await emailFactory.send(mailOptions);
        return response;
    }


    /**
     * Updates password for the user
     *
     * @param {String} token jwtauth token
     * @param {String} password new password
     * 
     */
    async resetPassword({ token, password }) {

        if (!token) {
            throw new Error('Token not supplied!');
        }

        if (!password) {
            throw new Error('New password not supplied!');
        }

        let decryptedEmail = jwt.verify(token, process.env.JWT_SECRET);

        let userDetails = await this.model.findOne({
            where: {
                email: decryptedEmail.email
            }
        });

        if (!userDetails) {
            throw new Error('Invalid token supplied!');
        }

        userDetails.password = password;

        await userDetails.save();

        return userDetails.reload();

    }

    /**
     * 
     * @param {*} params 
     * 
     * returns user location meta {Object}
     */
    async getUserLocationMeta(params) {

        const _decodedCountryCode = Buffer.from(params.countryCode, 'base64').toString();

        let userLocationMeta = countriesList['countries'][_decodedCountryCode];

        return userLocationMeta

    }


}
