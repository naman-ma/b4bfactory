const uuid = require('uuid/v1');
const models = require('../../models/slave');
const Settings = models.settings;
const { generate } = require('../../helpers/jwtToken');

module.exports = class PlatformService {

  constructor() {
  }

  /**
   * return all the list of added settings
   */
  getAllSettings() {
    return Settings.findAll({}, { raw: true })
      .then(result => {
        // console.log('result: ', result);
        return result
        // return {
        //   settings: generate(result, '1h'),
        // };
      })
  }


  async addSetting(body) {
    if (!body.key) {
      throw new Error('Key not received!');
    }

    if (!body.value) {
      throw new Error('Value not received!');
    }

    // check if setting by same key already exists
    let settingExists = await Settings.findOne({
      where: {
        key: body.key
      }
    });

    // console.log('settingExists: ', settingExists);
    if (settingExists) {
      throw new Error('Setting by this key already exists!');
    }

    // Create a setting object
    const setting = {
      uid: uuid(),
      key: body.key,
      value: body.value
    };

    // Save setting in the database
    return Settings.create(setting)
      .then(data => {
        return data
      });
  }


  /**
   * Updates setting
   * 
   * @param  {Object} data
   * @return {Object}
   */
  async updateSetting(body) {

    if (!body.uid) {
      throw new Error('Setting id not received!');
    }

    if (!body.key) {
      throw new Error('Key not received!');
    }

    if (!body.value) {
      throw new Error('Value not received!');
    }

    let setting = await Settings.findOne({
      where: {
        uid: body.uid
      }
    });

    if (!setting) {
      throw new Error('Setting with this id doesn\'t exists!');
    }

    if (body.key !== '' && body.value !== '') {
      setting.key = body.key;
      setting.value = body.value;
      await setting.save();
    }

    return setting.reload();
  }


}