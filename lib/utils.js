(function() {
    "use strict";

    function endWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    module.exports.endWith = endWith;
})();
