
var _ = require('lodash');
var rnCSSFix = require('./rnCSSFix');

var r_css_rule = /([a-zA-Z\-\.\s]+)\:([^;]+);*/g;

module.exports = function (css) {
    var temp = null,
        obj = {},
        key = '',
        value = '';

    css = _.trim(css);

    while ( temp = r_css_rule.exec(css) ) {
        key = _.camelCase(_.trim(temp[1]));
        value = _.trim(temp[2]);

        obj = _.assign(obj, rnCSSFix(key, value));
    }

    return obj;
};
