module.exports = (function () {

  this.processHandler = () => {

    process.on('uncaughtException', (err) => {
      console.log('uncaughtException -->err: >> Please take care of it!!', err, err.stack);
    });

    process.on('unhandledRejection', (err) => {
      console.log('unhandledRejection -->err: >> Please handle it!!', err);
    });

  }

  return this;
})();