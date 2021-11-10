"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var nestjs_typegoose_1 = require("nestjs-typegoose");
var config_1 = require("@nestjs/config");
var modules_module_1 = require("./modules/modules.module");
var auth_module_1 = require("./lib/auth/auth.module");
var common_module_1 = require("./lib/common/common.module");
var configuration_1 = require("./config/configuration");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    cache: true,
                    load: [configuration_1["default"]]
                }),
                nestjs_typegoose_1.TypegooseModule.forRoot('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME),
                // TypegooseModule.forRoot('mongodb://test:test1234@54.178.58.215:9003/admin'),
                modules_module_1.ModulesModule,
                auth_module_1.AuthModule,
                common_module_1.CommonModule,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
