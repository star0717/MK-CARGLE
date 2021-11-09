"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var users_module_1 = require("../../modules/users/users.module");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
var jwt_strategy_1 = require("./strategy/jwt.strategy");
var config_1 = require("@nestjs/config");
var configuration_1 = require("../../config/configuration");
var companies_module_1 = require("../../modules/companies/companies.module");
var axios_1 = require("@nestjs/axios");
var common_module_1 = require("../common/common.module");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({ load: [configuration_1["default"]] }),
                users_module_1.UsersModule,
                companies_module_1.CompaniesModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    secret: "" + (0, configuration_1["default"])().token.key,
                    signOptions: { expiresIn: '1d' }
                }),
                axios_1.HttpModule,
                common_module_1.CommonModule
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
