module.exports = async function (req, res, next) {

  // database connection
  const dbConnection = require('../database/connection');

  await dbConnection.authenticate()
  // .then(() => {
  //   console.log(`Connection has been established to SQL database '${process.env.DB_MASTER_NAME}' successfully!`);
  // })
  // .catch(err => {
  //   console.error('Unable to connect to the database:', err);
  // });

  // || req.header('origin')
  let incomingUrl = req.headers['origin'] || "http://localhost:4200";

  // Find if url exists
  return dbConnection
    .query(`SELECT * FROM services WHERE database_url like '%${incomingUrl}%'`, { type: dbConnection.Sequelize.QueryTypes.SELECT })
    .then(result => {
      // if database exists and it is active
      if (result && result.length > 0) {
        // return result here if database status is not active i.e, status=0
        if (!result[0].status) {
          // return ReE(res, new Error('Database not active'), 422, 'Database is not active!');
          return res.status(504).json({
            success: false,
            message: 'Database is not active!'
          });
        }
        globalConfig.database[process.env.ENVIRONMENT].database = result[0]['database_name'];
        next();
      } else {
        // return JSON response if database url not found
        return res.status(504).json({
          success: false,
          message: 'Database not found!'
        });
      }
    })
  // .done(function (result, err) {
  //   // dbConnection.close()
  //   next();
  // })

};
