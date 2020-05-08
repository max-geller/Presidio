"use strict";
var core_1 = require("@babel/core");
var plugin = function (_api) { return ({
    visitor: {
        ObjectProperty: function (path) {
            var node = path.node;
            if (!core_1.types.isIdentifier(node.key))
                return;
            if (node.key.name === 'templateUrl') {
                if (!core_1.types.isStringLiteral(node.value))
                    return;
                var requireIdentifier = core_1.types.identifier('require');
                var templateUrl = node.value.value;
                if (!templateUrl.match(/^(\.\/|\.\.\/|\/)/)) {
                    templateUrl = "./" + templateUrl;
                }
                var templateUrlStringLiteral = core_1.types.stringLiteral(templateUrl);
                var templateCallExpr = core_1.types.callExpression(requireIdentifier, [templateUrlStringLiteral]);
                var templateIdentifier = core_1.types.identifier('template');
                var templateProperty = core_1.types.objectProperty(templateIdentifier, templateCallExpr);
                path.replaceWith(templateProperty);
            }
            else if (node.key.name === 'styleUrls') {
                if (!core_1.types.isArrayExpression(node.value))
                    return;
                if (node.value.elements.length === 0)
                    return;
                var emptyArray = core_1.types.arrayExpression([]);
                var styleUrlsIdentifier = core_1.types.identifier('styleUrls');
                var styleUrlsProperty = core_1.types.objectProperty(styleUrlsIdentifier, emptyArray);
                path.replaceWith(styleUrlsProperty);
            }
        }
    }
}); };
module.exports = plugin;
