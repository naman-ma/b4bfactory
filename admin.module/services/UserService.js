const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const models = require('../../models/slave');
const Users = models.users;

const upload = async (fileName, file, user) => {
  const dir = path.join(__dirname, '../../public/uploads/user', user.uid);
  const stamp = Date.now().toString();
  if (!fs.existsSync(dir)) {
    await new Promise((res, rej) => {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) rej(err);
        res('Directory created.');
      });
    });
  }
  return new Promise((resolve, reject) => {
    let name = path.basename(fileName);
    fileName = path.join(dir, stamp + name);
    let stream = fs.createReadStream(file.path);

    stream.on('open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      stream.pipe(fs.createWriteStream(fileName));
    });

    stream.on('close', resolve('/' + user.uid + '/' + stamp + name));
    stream.on('error', reject('/' + user.uid + '/' + stamp + name));
  });
}
module.exports = class UserService {

  constructor() {
  }

  /**
   * Updae User Details
   *
   * @params
   * uid : string (current user id)
   * @returns {object} userdetails
   * @throws {Error}
   */
  async updateUser({ uid, fields, files }) {

    if (!uid) {
      throw new Error('User id not found!');
    }

    let userDetails = await Users.findOne({
      where: {
        uid: uid
      }
    });

    if (!userDetails) {
      throw new Error('User details with this id not found!');
    }

    let updateObj = {};
    if (files && files.profile_pic) {
      let uploadRes = await upload(files.profile_pic.name, files.profile_pic, userDetails);
      updateObj.profile_pic = uploadRes;
      userDetails.profile_pic = `/user${uploadRes}`;
    }

    if (fields.first_name && fields.first_name !== "") {
      updateObj.first_name = fields['first_name'];
      userDetails.first_name = fields['first_name'];
    }

    if (fields.last_name && fields.last_name !== "") {
      updateObj.last_name = fields['last_name'];
      userDetails.last_name = fields['last_name'];
    }

    if (fields.email && fields.email !== "") {
      updateObj.email = fields['email'];
    }

    if (fields.old_password && fields.old_password !== "" && fields.new_password && fields.new_password !== "") {
      let isValid = bcrypt.compareSync(fields['old_password'], userDetails.password);
      if (!isValid) {
        throw new Error('Old password not correct!');
      }
      // updateObj.password = await bcrypt.hashSync(fields['new_password'], Number(process.env.BCRYPT_SALT));
      userDetails.password = fields.new_password;
    }

    await userDetails.save();

    return userDetails.reload();
  }

}