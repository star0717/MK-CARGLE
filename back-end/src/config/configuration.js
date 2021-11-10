"use strict";
exports.__esModule = true;
exports.getMrnPath = exports.getCrnPath = void 0;
exports["default"] = (function () { return ({
    db: {
        host: process.env.TK_KEY,
        name: process.env.DB_NAME
    },
    token: {
        key: process.env.TK_KEY,
        name: process.env.TK_NAME
    },
    busNumValidation: {
        api_key: process.env.BUSNUM_API_KEY,
        url: process.env.BUSNUM_URL
    },
    mailerModule: {
        transport: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            ignoreTLS: process.env.MAIL_IGNORE_TLS,
            secure: process.env.MAIL_SECURE,
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASS
            }
        },
        defaults: {
            from: process.env.MAIL_FROM
        }
    },
    fileStorage: {
        root: process.env.FILE_STORAGE,
        crn_path: process.env.CRN_PATH,
        mrn_path: process.env.MRN_PATH
    }
}); });
var getCrnPath = function () {
    return process.env.FILE_STORAGE + process.env.CRN_PATH;
};
exports.getCrnPath = getCrnPath;
var getMrnPath = function () {
    return process.env.FILE_STORAGE + process.env.MRN_PATH;
};
exports.getMrnPath = getMrnPath;
