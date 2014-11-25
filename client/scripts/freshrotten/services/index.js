'use strict';

module.exports = function(app) {
    // inject:start
    require('./searchRotten')(app);
    // inject:end
};