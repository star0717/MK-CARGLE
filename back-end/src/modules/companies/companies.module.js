"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompaniesModule = void 0;
var common_1 = require("@nestjs/common");
var companies_service_1 = require("./companies.service");
var companies_controller_1 = require("./companies.controller");
var company_entity_1 = require("../../models/company.entity");
var nestjs_typegoose_1 = require("nestjs-typegoose");
var CompaniesModule = /** @class */ (function () {
    function CompaniesModule() {
    }
    CompaniesModule = __decorate([
        (0, common_1.Module)({
            imports: [
                nestjs_typegoose_1.TypegooseModule.forFeature([company_entity_1.Company]),
            ],
            controllers: [companies_controller_1.CompaniesController],
            providers: [companies_service_1.CompaniesService],
            exports: [companies_service_1.CompaniesService] //AuthModule에서 사용가능하도록 노출
        })
    ], CompaniesModule);
    return CompaniesModule;
}());
exports.CompaniesModule = CompaniesModule;
