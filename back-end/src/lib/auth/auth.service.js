"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var auth_entity_1 = require("../../models/auth.entity");
var company_entity_1 = require("../../models/company.entity");
var user_entity_1 = require("../../models/user.entity");
var companies_service_1 = require("../../modules/companies/companies.service");
var users_service_1 = require("../../modules/users/users.service");
var AuthService = /** @class */ (function () {
    function AuthService(usersService, companiesService, jwtService) {
        this.usersService = usersService;
        this.companiesService = companiesService;
        this.jwtService = jwtService;
    }
    AuthService.prototype.signUp = function (signUpInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var company, user, err_1, newSignUpInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(signUpInfo);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        if (!(signUpInfo.user.auth == user_entity_1.UserAuthority.OWNER)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.companiesService.create(signUpInfo.company)];
                    case 2:
                        // 신규 사업자 등록
                        company = _a.sent();
                        if (!company) {
                            throw new common_1.BadRequestException();
                        }
                        // 업주 정보에 업체의 ID 주입
                        signUpInfo.user.comID = company._id;
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(signUpInfo.user.auth == user_entity_1.UserAuthority.WORKER)) return [3 /*break*/, 5];
                        console.log(signUpInfo.user);
                        return [4 /*yield*/, this.companiesService.findById(signUpInfo.user.comID)];
                    case 4:
                        // 해당 사업자 검색
                        company = _a.sent();
                        if (!company) {
                            throw new common_1.BadRequestException();
                        }
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.usersService.create(signUpInfo.user)];
                    case 6:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException();
                        if (!(signUpInfo.user.auth == user_entity_1.UserAuthority.OWNER)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.companiesService.update(company._id, { ownerName: user.name })];
                    case 7:
                        company = _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_1 = _a.sent();
                        console.log(err_1);
                        if (signUpInfo.user.auth == user_entity_1.UserAuthority.OWNER && company) {
                            this.companiesService.remove(company._id);
                        }
                        throw new common_1.BadRequestException();
                    case 10:
                        newSignUpInfo = {
                            user: user,
                            company: company
                        };
                        return [2 /*return*/, newSignUpInfo];
                }
            });
        });
    };
    /**
     * 로그인 정보를 통해 사용자를 검증하고 토큰 반환
     * @param userInfo 로그인에 사용할 사용자 정보
     * @returns 성공시: 토큰, 실패시: UnauthorizedException 발생
     */
    AuthService.prototype.validateUserInfo = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var user, company, authToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('validateUser in AuthService');
                        return [4 /*yield*/, this.usersService.findUserBySignInInfo(userInfo)];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        // 시스템에 등록된 사용자가 아닐경우 exception 발생
                        if (!user) {
                            throw new common_1.UnauthorizedException();
                        }
                        return [4 /*yield*/, this.companiesService.findById(user.comID)];
                    case 2:
                        company = _a.sent();
                        if (!company) {
                            throw new common_1.UnauthorizedException();
                        }
                        authToken = {
                            cID: company._id,
                            cName: company.name,
                            uID: user._id,
                            uName: user.name
                        };
                        console.log(authToken);
                        return [2 /*return*/, this.genJwtToken(authToken)];
                }
            });
        });
    };
    /**
     * 사용자 인증토큰 발급
     * @param authToken 토큰을 발급할 사용자의 정보
     * @returns 발급된 인증 토큰
     */
    AuthService.prototype.genJwtToken = function (authToken) {
        return this.jwtService.sign(authToken);
    };
    AuthService.prototype.findUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findUserByEmail(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.findUserByHpNumber = function (hpNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findUserByHpNumber(hpNumber)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
