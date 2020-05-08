"use strict";
var loadHtmlTransformer = {
    process: function (src) {
        return "module.exports=" + JSON.stringify(src);
    }
};
module.exports = loadHtmlTransformer;
