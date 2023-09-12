'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ROLES } = require('../../constants/roles');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    uid: {
      type: DataTypes.STRING(191),
      field: 'uid'
    },
    first_name: {
      type: DataTypes.STRING(191),
      field: 'first_name'
    },
    last_name: {
      type: DataTypes.STRING(191),
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email"
        }
      }
    },
    password: DataTypes.STRING,
    mobile: {
      type: DataTypes.STRING(191),
    },
    gender: {
      type: DataTypes.STRING(191),
    },
    profile_pic: {
      type: DataTypes.STRING(191),
    },
  }, {
    underscored: true,
    getterMethods: {
      fullName() {
        let firstName = this.getDataValue('first_name');
        let lastName = this.getDataValue('last_name');
        return firstName + " " + lastName;
      }
    }
  });
  users.associate = function (models) {
    // associations can be defined here
    users.hasMany(models.user_has_roles, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "role",
      onDelete: "CASCADE"
    });

    users.hasMany(models.user_metas, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "metas",
      onDelete: "CASCADE"
    });

  };

  users.beforeSave((user, options) => {
    if (user.changed('password')) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      // Store hash in your password DB.
      user.password = hash;
    }

  });

  users.prototype.comparePassword = async function (password) {
    const passwordsMatch = await bcrypt.compare(password, this.password);
    if (passwordsMatch) {
      return true
    } else {
      return TE('Invalid password!');
    }
  };

  return users;
};