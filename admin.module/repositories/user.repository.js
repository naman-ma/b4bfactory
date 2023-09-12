const fs = require('fs');
const path = require('path');
const AbstractRepository = require('../../extends/abstract/abstract.repository');
const Mailer = require('../../utils/email');
const messages = require('../../constants/messages');

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
   * Fetches all users from the table
   * 
   * @param  {Object} query
   *
   * @throws {Error}
   * @return {Object}
   */
  async paginate(query = {}, language) {
    let where = {}, order = [], opts = {};

    // this.setLanguage('en');

    if (query.sort) {
      order.push([query.sort.field, query.sort.order]);
    }

    let total = await this.count();

    if (query.search) {
      where = this.model.sequelize.literal(
        ` concat_ws(' ',first_name,last_name) like '%${query.search}%'`);
    }

    opts = {
      // attributes: [],
      where,
      order
    }

    let filtered = await this.count(opts);

    if (query.paginate) {
      // let skip;
      // skip = ((query.paginate.offset - 1) * query.paginate.limit);
      // opts.limit = query.paginate.limit;
      // opts.offset = skip;
      opts.limit = query.paginate.limit;
      opts.offset = query.paginate.offset;
    }

    let rows = await this.findAll(opts);

    return {
      rows,
      paginate: {
        ...query.paginate,
        filtered,
        total
      }
    }
  }

  /**
   * 
   * @param {id} encoded uid of the user 
   * @returns  {object} user details
   * @throws {Error}
   */
  async getUserDetails(params) {

    const _decodeId = Buffer.from(params.id, 'base64').toString();

    if (!_decodeId) {
      throw new Error('User Id not received!');
    }

    // check user details with the id received
    const userDetails = await this.findOne({
      where: {
        uid: _decodeId
      },
      include: [{
        model: this.relations.user_has_roles,
        as: 'role'
      }]
    });

    if (!userDetails) {
      throw new Error('Userdetails not found!');
    }

    return userDetails
  }

  /**
   * 
   * @body {Object} 
   * @throws {Error}
   */
  async sendWarningMail(body) {

    if (body.email == "" || body.email == {} || body.email.length == 0 || !body.email) {
      return new Error(messages.EMAIL_NOT_FOUND);
    }

    let userExists = await this.findOne({
      where: {
        email: body.email
      },
    });

    if (!userExists) {
      throw new Error(messages.ACCOUNT_NOT_FOUND);
    }

    let emailFactory = new Mailer();

    let htmlToSend = await emailFactory.buildTemplate('user_warning.html', {
      ...userExists.dataValues,
      content: body.mailContent,
      app: process.env.APP
    });

    var mailOptions = {
      from: process.env.SMTP_USER,
      to: body.email,
      subject: 'Warning Email',
      html: htmlToSend
    }

    // send warning email to user
    let response = await emailFactory.send(mailOptions);
    return response;
  }

  /**
   * 
   * @returns userCount 
   * @throws {Error}
   */
  async getAllUsersCount() {
    const userCount = await this.count();

    if (!userCount) {
      throw new Error('Users not found!');
    }

    return userCount
  }

  async mutateLanguage(row) {
    // let meta = await row.getMeta();
    // console.log('role: ', role);
    // meta.getTranslation()

    // Get meta with type translation

    // Extract translation from model -> model_meta -> translation

    // if language found => Mutate available columns as column -> {column}_local || model.column -> {column}_local

    return row;
  }

}