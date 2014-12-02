'use strict';

module.exports = function(app) {
    // inject:start
    require('./appCtrl')(app);
    require('./movieCtrl')(app);
    require('./searchRottenCtrl')(app);
    // inject:end
};