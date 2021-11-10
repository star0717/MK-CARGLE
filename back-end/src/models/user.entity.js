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
exports.User = exports.UserAuthority = void 0;
var swagger_1 = require("@nestjs/swagger");
var typegoose_1 = require("@typegoose/typegoose");
var class_validator_1 = require("class-validator");
var base_entity_1 = require("./base.entity");
var bcrypt_1 = require("bcrypt");
var saltRounds = 10;
/**
 * 사용자의 권한
 */
var UserAuthority;
(function (UserAuthority) {
    UserAuthority["ADMIN"] = "admin";
    UserAuthority["OWNER"] = "owner";
    UserAuthority["WORKER"] = "worker"; // 카센터 직원
})(UserAuthority = exports.UserAuthority || (exports.UserAuthority = {}));
/**
 * 사용자 모델 스키마
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "메일주소", "default": "example@mklc.co.kr" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEmail)(),
        (0, typegoose_1.prop)({
            unique: true,
            required: [true, "메일주소는 필수 항목입니다."],
            trim: true
        })
    ], User.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "비밀번호. 매뉴얼 로그인에서 사용(소셜로그인에서 사용 안함)" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: true,
            trim: true,
            select: false,
            set: function (val) { return (0, bcrypt_1.hashSync)(val, saltRounds); },
            get: function (val) { return val; }
        })
    ], User.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "사용자권한", "default": UserAuthority.WORKER }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(UserAuthority),
        (0, typegoose_1.prop)({
            "enum": UserAuthority,
            required: [true, "사용자권한은 필수 항목입니다."],
            "default": UserAuthority.OWNER
        })
    ], User.prototype, "auth");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "사용자명" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: [true, "사용자명은 필수 항목입니다."],
            trim: true
        })
    ], User.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "업체의 ObjectID", "default": "6182713d37f2762e4db14b53" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsMongoId)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: [false, "사업자 ID는 필수 항목입니다."],
            trim: true
        })
    ], User.prototype, "comID");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "핸드폰번호" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, typegoose_1.prop)({
            unique: true,
            required: [true, "핸드폰번호는 필수 항목입니다."]
        })
    ], User.prototype, "hpNumber");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "승인여부", "default": false }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsBoolean)(),
        (0, typegoose_1.prop)({
            unique: false,
            required: true,
            "default": false
        })
    ], User.prototype, "approval");
    return User;
}(base_entity_1.BaseEntity));
exports.User = User;
