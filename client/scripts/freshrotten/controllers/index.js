'use strict';

module.exports = function(app) {
    // inject:start
    require('./movieCtrl')(app);
    require('./searchRottenCtrl')(app);
    // inject:end
};