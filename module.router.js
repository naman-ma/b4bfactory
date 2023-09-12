const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const { module_routes, module_prefix } = require('./config/app.config');
const jwtParser = require('./middlewares/jwtMiddleware');

let directory = fs.readdirSync(__dirname);
for (let i = 0; i < directory.length; i++) {
    let parts = directory[i].split('.');

    if (parts[1] === module_prefix) {
        let routePath = path.join(__dirname, directory[i], module_routes);
        fs.readFile(routePath, function (err, file) {
            if (file) {
                // jwtParser
                router.use('/' + parts[0] + '/', require(routePath))
            }
        });
    }
}

// Default route for /
router.get('/', function (req, res) {
    res.send('test');
});

module.exports = router;