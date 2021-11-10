"use strict";
exports.__esModule = true;
exports.docFileInterceptor = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
exports.docFileInterceptor = (0, platform_express_1.FileInterceptor)('file', {
    fileFilter: function (req, file, cb) {
        if (file.mimetype.match('image/jpeg|image/png|application/pdf')) {
            cb(null, true);
        }
        else {
            cb(new common_1.BadRequestException(), false);
        }
    }
});
