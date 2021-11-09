"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommonController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var CommonController = /** @class */ (function () {
    function CommonController(comServiceService, mailerService) {
        this.comServiceService = comServiceService;
        this.mailerService = mailerService;
    }
    CommonController = __decorate([
        (0, swagger_1.ApiTags)("공통 기능 API"),
        (0, common_1.Controller)('com-service')
    ], CommonController);
    return CommonController;
}());
exports.CommonController = CommonController;