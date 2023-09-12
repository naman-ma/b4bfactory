# b4bfactory-backend
b4bfactory Node JS(Express) backend repository

### Run the project
1. Clone the project, then navigate to project project and there run the command `npm install`

2. After node_modules have been installed then after create two databases in the MySQL database, the details of which are mentioned below:
  a. A master database : `b4bacftory-master` and 
  b. A slave database: `b4bfactory`

After the database have been created, then run the commands mentioned below one after the other:
  - To create the tables, run the command `npm run migrate`
  - To enter some data into the created tables, run the command  `npm run seed`

3. To start the project, run the command `npm run dev`

After this now the project(Node JS(Express) backend) will start running on port 3000.

### Environment setup
- Rename .env.sample to .env
- Populate environment variables.

### For master database migrations, make the following changes in the below mentioned files:

To run master database migrations:
1. In the .sequelizerc file, make the changes mentioned below:
module.exports = {
  'migrations-path': path.join(__dirname, 'database/migrations_master'),
};
2. In the package.json, make the changes mentioned below:
  "scripts": {
    "migrate": "node_modules/.bin/sequelize db:migrate --config=config/database.config.js --env master"
  }

### For master database seeders, make the following changes in the below mentioned files:

To run seeders:
1. In .sequelizerc file, make the changes mentioned below:
 module.exports = {
  'seeders-path': path.join(__dirname, 'database/seeders_master'),
};
2. In package.json, make the changes mentioned below:
  "scripts": {
    "seed": "node_modules/.bin/sequelize db:seed:all --config=config/database.config.js --env master"
  }



OLD BEFORE FACTORY