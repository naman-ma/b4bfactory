module.exports = async function (req, res, next) {

    // app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ");
    res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, content-type, Authorization, Content-Type, X-Role-Access, language, currency");
    res.header("Access-Control-Allow-Credentials", true);
    // });

    // let origin = process.env.NODE_ENV_HEADER === 'local' ? 'http://localhost:4200' : 'https://abc.com';
    // res.setHeader('Access-Control-Allow-Origin', origin);

    next();
}
