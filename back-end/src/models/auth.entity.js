"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthTokenInfo = exports.UserInfo = exports.SignUpInfo = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var company_entity_1 = require("./company.entity");
var user_entity_1 = require("./user.entity");
/**
 * 회원 가입 정보용 DTO
 */
var SignUpInfo = /** @class */ (function () {
    function SignUpInfo() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "회원 가입에 사용할 사용자 정보" }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return user_entity_1.User; })
    ], SignUpInfo.prototype, "user");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "회원 가입에 사용할 업체 정보 (오너 가입시에만 사용)" }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(function () { return company_entity_1.Company; })
    ], SignUpInfo.prototype, "company");
    return SignUpInfo;
}());
exports.SignUpInfo = SignUpInfo;
/**
 * 로그인을 시도할 때 사용할 사용자 정보
 * 로그인에서 사용하는 AuthGuard에서는 아래 정의된 필드명을 사용자 정보로 사용함
 * - 실제 시스템에서 로그인 식별자로 email을 이용하더라도 username 필드에 email값을 채워 보내야함
 * - 실제 데이터 맵핑은 UsersService에서 조정함
 */
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "로그인에 사용될 사용자의 식별자" }),
        (0, class_validator_1.IsString)()
    ], UserInfo.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "로그인에 사용될 패스워드" }),
        (0, class_validator_1.IsString)()
    ], UserInfo.prototype, "pwd");
    return UserInfo;
}());
exports.UserInfo = UserInfo;
/**
 * 로그인 시 발급되는 토큰을 구성하는 정보
 */
var AuthTokenInfo = /** @class */ (function () {
    function AuthTokenInfo() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "사용자명" }),
        (0, class_validator_1.IsString)()
    ], AuthTokenInfo.prototype, "uID");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "사용자 ObjectID" }),
        (0, class_validator_1.IsString)()
    ], AuthTokenInfo.prototype, "uName");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "업체명" }),
        (0, class_validator_1.IsString)()
    ], AuthTokenInfo.prototype, "cID");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "업체 ObjectID" }),
        (0, class_validator_1.IsString)()
    ], AuthTokenInfo.prototype, "cName");
    return AuthTokenInfo;
}());
exports.AuthTokenInfo = AuthTokenInfo;
