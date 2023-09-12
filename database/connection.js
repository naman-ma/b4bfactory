const Sequelize = require('sequelize');

// create mysql connection;
module.exports = new Sequelize({
  database: process.env.DB_MASTER_NAME || 'b4bfactory-master', 
  username: process.env.DB_USERNAME || 'root', 
  password: process.env.DB_PASSWORD || 'root', 
  host: process.env.localhost || 'localhost',
  dialect: process.env.DB_DIALECT || 'mysql',
  
  // pool: {
  //   max: 5, // maximum number of connection in pool
  //   min: 0, // minimum number of connection in pool
  //   idle: process.env.DB_POOL_IDLE || 10000 // maximum time, in milliseconds, that a connection can be idle before being released
  //   // acquire: process.env.DB_POOL_ACQUIRE || 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
  // },
});
