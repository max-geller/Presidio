'use strict';
var printAttributes = function (val, attributes, print, indent, colors, opts) {
    return attributes
        .sort()
        .map(function (attribute) {
        return (opts.spacing +
            indent(colors.prop.open + attribute + colors.prop.close + '=') +
            colors.value.open +
            (val.componentInstance[attribute] &&
                val.componentInstance[attribute].constructor
                ? '{[Function ' +
                    val.componentInstance[attribute].constructor.name +
                    ']}'
                : "\"" + val.componentInstance[attribute] + "\"") +
            colors.value.close);
    })
        .join('');
};
var print = function (val, print, indent, opts, colors) {
    var componentAttrs = '';
    var componentName = val.componentRef._elDef.element.name;
    var nodes = (val.componentRef._view.nodes || [])
        .filter(function (node) { return node && node.hasOwnProperty('renderElement'); })
        .map(function (node) { return Array.from(node.renderElement.childNodes).map(print).join(''); })
        .join(opts.edgeSpacing);
    var attributes = Object.keys(val.componentInstance);
    if (attributes.length) {
        componentAttrs += printAttributes(val, attributes, print, indent, colors, opts);
    }
    return ('<' +
        componentName +
        componentAttrs +
        (componentAttrs.length ? '\n' : '') +
        '>\n' +
        indent(nodes) +
        '\n</' +
        componentName +
        '>');
};
var test = function (val) {
    return val !== undefined &&
        val !== null &&
        typeof val === 'object' &&
        Object.prototype.hasOwnProperty.call(val, 'componentRef');
};
module.exports = {
    print: print,
    test: test
};
