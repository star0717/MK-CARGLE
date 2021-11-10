"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommonModule = void 0;
var common_1 = require("@nestjs/common");
var common_service_1 = require("./common.service");
var common_controller_1 = require("./common.controller");
var mailer_1 = require("@nestjs-modules/mailer");
var handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
var config_1 = require("@nestjs/config");
var configuration_1 = require("../../config/configuration");
var CommonModule = /** @class */ (function () {
    function CommonModule() {
    }
    CommonModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                mailer_1.MailerModule.forRoot({
                    transport: {
                        host: (0, configuration_1["default"])().mailerModule.transport.host,
                        port: parseInt((0, configuration_1["default"])().mailerModule.transport.port),
                        ignoreTLS: (0, configuration_1["default"])().mailerModule.transport.ignoreTLS,
                        secure: (0, configuration_1["default"])().mailerModule.transport.secure,
                        auth: {
                            user: (0, configuration_1["default"])().mailerModule.transport.auth.user,
                            pass: (0, configuration_1["default"])().mailerModule.transport.auth.pass
                        }
                    },
                    defaults: {
                        from: (0, configuration_1["default"])().mailerModule.defaults.from
                    },
                    template: {
                        dir: __dirname + '/templates',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true
                        }
                    }
                })
            ],
            controllers: [common_controller_1.CommonController],
            providers: [common_service_1.CommonService],
            exports: [common_service_1.CommonService]
        })
    ], CommonModule);
    return CommonModule;
}());
exports.CommonModule = CommonModule;
