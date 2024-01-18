"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SORT_ORDER_LIST = exports.SORT_ORDER = exports.STATUS_LIST = exports.STATUS = exports.JWT_SECRET = exports.Constants = void 0;
exports.Constants = {
    BY_PASS_URLS: ['/auth/login', '/auth/reset-password', '/auth/reset-pass', '/user/signup']
};
exports.JWT_SECRET = process.env.JWT_PRIVATE_KEY;
var STATUS;
(function (STATUS) {
    STATUS["ACTIVE"] = "ACTIVE";
    STATUS["INACTIVE"] = "INACTIVE";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
exports.STATUS_LIST = Object.keys(STATUS);
exports.SORT_ORDER = {
    ASC: 'ASC',
    DESC: 'DESC',
};
exports.SORT_ORDER_LIST = (() => Object.keys(exports.SORT_ORDER))();
//# sourceMappingURL=constants.js.map