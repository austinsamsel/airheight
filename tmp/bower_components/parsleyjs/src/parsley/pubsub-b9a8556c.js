define("parsley/pubsub",["parsley/field","parsley/form"],function(e,t){var n=$({}),i={};$.listen=function(e){if("undefined"==typeof i[e]&&(i[e]=[]),"function"==typeof arguments[1])return i[e].push({fn:arguments[1]});if("object"==typeof arguments[1]&&"function"==typeof arguments[2])return i[e].push({fn:arguments[2],ctxt:arguments[1]});throw new Error("Wrong parameters")},$.listenTo=function(n,r,o){if("undefined"==typeof i[r]&&(i[r]=[]),!(n instanceof e||n instanceof t))throw new Error("Must give Parsley instance");if("string"!=typeof r||"function"!=typeof o)throw new Error("Wrong parameters");i[r].push({instance:n,fn:o})},$.unsubscribe=function(e,t){if("undefined"!=typeof i[e]){if("string"!=typeof e||"function"!=typeof t)throw new Error("Wrong arguments");for(var n=0;n<i[e].length;n++)if(i[e][n].fn===t)return i[e].splice(n,1)}},$.unsubscribeTo=function(n,r){if("undefined"!=typeof i[r]){if(!(n instanceof e||n instanceof t))throw new Error("Must give Parsley instance");for(var o=0;o<i[r].length;o++)if("undefined"!=typeof i[r][o].instance&&i[r][o].instance.__id__===n.__id__)return i[r].splice(o,1)}},$.unsubscribeAll=function(e){"undefined"!=typeof i[e]&&delete i[e]},$.emit=function(r,o){if("undefined"!=typeof i[r])for(var s=0;s<i[r].length;s++)if("undefined"!=typeof i[r][s].instance){if(o instanceof e||o instanceof t)if(i[r][s].instance.__id__!==o.__id__){if(i[r][s].instance instanceof t&&o instanceof e)for(var a=0;a<i[r][s].instance.fields.length;a++)if(i[r][s].instance.fields[a].__id__===o.__id__){i[r][s].fn.apply(n,Array.prototype.slice.call(arguments,1));continue}}else i[r][s].fn.apply(n,Array.prototype.slice.call(arguments,1))}else i[r][s].fn.apply("undefined"!=typeof i[r][s].ctxt?i[r][s].ctxt:n,Array.prototype.slice.call(arguments,1))},$.subscribed=function(){return i}});