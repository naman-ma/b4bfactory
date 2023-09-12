module.exports = {
  "master": {
    "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || 'root',
    "database": process.env.DB_MASTER_NAME || 'b4bfactory-master',
    "host": process.env.DB_HOST || '127.0.0.1',
    "dialect": process.env.DB_DIALECT || 'mysql',
    "operatorsAliases": 0
  },
  "development": {
    "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || 'root',
    "database": process.env.DB_NAME || 'b4bfactory',
    "host": process.env.DB_HOST || '127.0.0.1',
    "dialect": process.env.DB_DIALECT || 'mysql',
    "operatorsAliases": 0
  },
  "test": {
    "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || 'root',
    "database": process.env.DB_NAME || 'b4bfactory',
    "host": process.env.DB_HOST || '127.0.0.1',
    "dialect": process.env.DB_DIALECT || 'mysql',
    "operatorsAliases": 0
  },
  "production": {
   "username": process.env.DB_USERNAME || 'root',
    "password": process.env.DB_PASSWORD || 'root',
    "database": process.env.DB_NAME || 'b4bfactory',
    "host": process.env.DB_HOST || '127.0.0.1',
    "dialect": process.env.DB_DIALECT || 'mysql',
    "operatorsAliases": 0
  }
}
