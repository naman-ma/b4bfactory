const path = require('path');

module.exports = {
    app_dir: path.dirname('/'),
    module_prefix: 'module',
    module_router: path.join(__dirname, '../', 'module.router.js'),
    module_routes: 'routes.js',
}