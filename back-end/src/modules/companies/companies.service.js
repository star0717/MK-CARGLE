"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CompaniesService = void 0;
var common_1 = require("@nestjs/common");
var nestjs_typegoose_1 = require("nestjs-typegoose");
var base_crud_service_1 = require("../../lib/base-crud/base-crud.service");
var company_entity_1 = require("../../models/company.entity");
var CompaniesService = /** @class */ (function (_super) {
    __extends(CompaniesService, _super);
    function CompaniesService(model) {
        var _this = _super.call(this, model) || this;
        _this.model = model;
        return _this;
    }
    CompaniesService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, nestjs_typegoose_1.InjectModel)(company_entity_1.Company))
    ], CompaniesService);
    return CompaniesService;
}(base_crud_service_1.BaseService));
exports.CompaniesService = CompaniesService;
