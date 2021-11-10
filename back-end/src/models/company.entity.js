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
exports.__esModule = true;
exports.Company = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var base_entity_1 = require("./base.entity");
var typegoose_1 = require("@typegoose/typegoose");
var Company = /** @class */ (function (_super) {
    __extends(Company, _super);
    function Company() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "상호명" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: [true, "상호명은 필수 항목입니다."],
            trim: true
        })
    ], Company.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "사업자등록번호" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, typegoose_1.prop)({
            unique: true,
            required: [true, "사업자등록번호는 필수 항목입니다."]
        })
    ], Company.prototype, "comRegNum");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "정비업등록번호" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, typegoose_1.prop)({
            unique: true,
            required: [true, "정비업등록번호는 필수 항목입니다."]
        })
    ], Company.prototype, "mbRegNum");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "정비업종" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: [true, "정비업종은 필수 항목입니다."]
        })
    ], Company.prototype, "mbTypeNum");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "대표명" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: [false, "대표명은 필수 항목입니다."],
            trim: true
        })
    ], Company.prototype, "ownerName");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "업태" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: [true, "업태는 필수 항목입니다."],
            "default": "정비업",
            trim: true
        })
    ], Company.prototype, "busType");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "업종" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: [true, "업종은 필수 항목입니다."],
            "default": "차량수리",
            trim: true
        })
    ], Company.prototype, "busItem");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "전화번호" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, typegoose_1.prop)({
            unique: true,
            required: [true, "전화번호는 필수 항목입니다."]
        })
    ], Company.prototype, "phoneNum");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "팩스번호" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, typegoose_1.prop)({
            unique: true,
            required: [false, "팩스번호는 필수 항목입니다."]
        })
    ], Company.prototype, "faxNum");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "사업장 주소" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: [true, "사업장 주소는 필수 항목입니다."]
        })
    ], Company.prototype, "address");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "승인여부", "default": false }),
        (0, class_validator_1.IsOptional)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: true,
            "default": false
        })
    ], Company.prototype, "approval");
    return Company;
}(base_entity_1.BaseEntity));
exports.Company = Company;
