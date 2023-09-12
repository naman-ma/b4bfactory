// // instantiate global functions
// require("./globalFunction");

// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const helmet = require("helmet");
// const compression = require('compression')

// const app = express();
// const { errorHandler, notFoundRoutes } = require("./middlewares/errorHandler");
// const { processHandler } = require("./middlewares/processHandler");
// const databaseMiddleware = require("./middlewares/databaseMiddleware");

// require('dotenv').config({
//   path: './.env'
// });

// // app.use(cors());

// app.use(helmet());

// // CORS
// app.use(require("./middlewares/corsMiddleware"));

// // database middleware for switching the database
// app.use(databaseMiddleware);


// app.use(compression({ filter: shouldCompress }))

// function shouldCompress (req, res) {
//   if (req.headers['x-no-compression']) {
//     // don't compress responses with this request header
//     return false
//   }
 
//   // fallback to standard filter function
//   return compression.filter(req, res)
// }

// const { module_router } = require('./config/app.config');

// app.use('/', express.static('public'));
// // app.use(express.static(path.join(__dirname, 'public')));

// app.use(logger('dev'));
// // parse requests of content-type - application/json
// app.use(express.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// // view engine setup
// app.set('view engine', 'html');

// app.use('/api/', require(module_router));

// // app.use(notFoundRoutes);
// app.use(errorHandler);
// app.use(processHandler);

// module.exports = app;
