const createError = require('http-errors');

module.exports = (function () {

  this.errorHandler = function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(res.locals.error.status || 500);

    console.log('errHandler::err>>>>>>: ', err);

    let error = {
      success: false,
      message: err.message || 'Something went wrong!'
    };

    res.json(error);
  }

  // catch 404 and forward to error handler
  this.notFoundRoutes = function (err, req, res, next) {
    next(createError(404));
  }

  return this;
})();
