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
exports.DeleteResult = exports.PaginateResult = exports.strToBoolean = exports.getValidTakeNumber = exports.getValidPageNumber = exports.PaginateOptions = exports.BaseEntity = void 0;
var swagger_1 = require("@nestjs/swagger");
var typegoose_1 = require("@typegoose/typegoose");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var nestjs_typegoose_1 = require("nestjs-typegoose");
/**
 * DB의 스키마로 사용할 모든 데이터 모델 클래스에 상속되는 기본 클래스
 */
var BaseEntity = /** @class */ (function (_super) {
    __extends(BaseEntity, _super);
    function BaseEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "오브젝트 ID (자동 생성)", required: false })
    ], BaseEntity.prototype, "_id");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "데이터 생성 시점 (자동 생성)", required: false }),
        (0, typegoose_1.prop)()
    ], BaseEntity.prototype, "createdAt");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "데이터 갱신 시점 (자동 갱신)", required: false }),
        (0, typegoose_1.prop)()
    ], BaseEntity.prototype, "updatedAt");
    __decorate([
        (0, typegoose_1.prop)({ type: Number, select: false })
    ], BaseEntity.prototype, "__v");
    return BaseEntity;
}(nestjs_typegoose_1.TypegooseModule));
exports.BaseEntity = BaseEntity;
var PaginateOptions = /** @class */ (function () {
    function PaginateOptions() {
        this.page = 1;
        this.take = PaginateOptions.defaultTakeNumber;
        this.useRegSearch = false;
    }
    PaginateOptions.prototype.getQuery = function () {
        console.log(this.useRegSearch);
        var query = "?page=" + this.page;
        if (this.searchField || this.searchKeyword) {
            query = query + "&searchField=" + this.searchField + "&searchKeyword=" + this.searchKeyword;
            if (this.useRegSearch == true) {
                query = query + "&useRegSearch=" + this.useRegSearch;
            }
        }
        return query;
    };
    PaginateOptions.defaultTakeNumber = 30;
    PaginateOptions.maxTakeNumber = 100;
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "요청 페이지", "default": 1, required: false }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_transformer_1.Transform)(getValidPageNumber)
    ], PaginateOptions.prototype, "page");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "페이지당 결과 수, 1 ~ 100 사이의 정수", "default": 30, minimum: 1, maximum: 100, required: false }),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_transformer_1.Transform)(getValidTakeNumber)
    ], PaginateOptions.prototype, "take");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "검색 조건 필드", required: false }),
        (0, class_validator_1.IsOptional)()
    ], PaginateOptions.prototype, "searchField");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "검색어", required: false }),
        (0, class_validator_1.IsOptional)()
    ], PaginateOptions.prototype, "searchKeyword");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "검색어 포함 정규식 사용 여부", "default": false, required: false }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(strToBoolean)
    ], PaginateOptions.prototype, "useRegSearch");
    return PaginateOptions;
}());
exports.PaginateOptions = PaginateOptions;
function getValidPageNumber(params) {
    if (params.value <= 0) {
        params.value = 1;
    }
    return params.value;
}
exports.getValidPageNumber = getValidPageNumber;
function getValidTakeNumber(params) {
    if (params.value <= 0) {
        params.value = PaginateOptions.defaultTakeNumber;
    }
    else if (params.value > PaginateOptions.maxTakeNumber) {
        params.value = PaginateOptions.maxTakeNumber;
    }
    return params.value;
}
exports.getValidTakeNumber = getValidTakeNumber;
function strToBoolean(params) {
    if (params.value == "true") {
        return true;
    }
    else {
        return false;
    }
}
exports.strToBoolean = strToBoolean;
var PaginateResult = /** @class */ (function () {
    function PaginateResult() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "검색 결과" })
    ], PaginateResult.prototype, "docs");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "검색 조건에 해당하는 전체 데이터의 수" })
    ], PaginateResult.prototype, "totalDocs");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "현재 페이지" })
    ], PaginateResult.prototype, "currentPage");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "마지막 페이지" })
    ], PaginateResult.prototype, "lastPage");
    return PaginateResult;
}());
exports.PaginateResult = PaginateResult;
var DeleteResult = /** @class */ (function () {
    function DeleteResult() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "삭제된 데이터의 수" })
    ], DeleteResult.prototype, "deletedCount");
    return DeleteResult;
}());
exports.DeleteResult = DeleteResult;
