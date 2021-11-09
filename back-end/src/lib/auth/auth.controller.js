"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var auth_entity_1 = require("../../models/auth.entity");
var user_entity_1 = require("../../models/user.entity");
var jwt_auth_guard_1 = require("./guard/jwt-auth.guard");
var rxjs_1 = require("rxjs");
var configuration_1 = require("../../config/configuration");
var crypto_1 = require("crypto");
var bcrypt_1 = require("bcrypt");
var multer_option_1 = require("../../config/multer.option");
var companies_service_1 = require("../../modules/companies/companies.service");
var AuthController = /** @class */ (function () {
    function AuthController(authService, httpService, commonService, companiesService) {
        this.authService = authService;
        this.httpService = httpService;
        this.commonService = commonService;
        this.companiesService = companiesService;
        this.env_config = (0, configuration_1["default"])();
    }
    AuthController.prototype.signUpForOwner = function (signUpInfo, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newSignInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 데이터 유효성 검증
                        if (signUpInfo.user.auth == user_entity_1.UserAuthority.OWNER) {
                            if (!signUpInfo.company || signUpInfo.user.comID) {
                                // 업주가 업체정보를 포함하지 않으면 에러 발생
                                throw new common_1.BadRequestException();
                            }
                        }
                        else if (signUpInfo.user.auth == user_entity_1.UserAuthority.WORKER) {
                            // 직원이 업체정보를 포함하면 에러 발생
                            if (signUpInfo.company || !signUpInfo.user.comID) {
                                throw new common_1.BadRequestException();
                            }
                        }
                        else {
                            throw new common_1.BadRequestException();
                        }
                        return [4 /*yield*/, this.authService.signUp(signUpInfo)];
                    case 1:
                        newSignInfo = _a.sent();
                        this.injectToken(newSignInfo, res);
                        return [2 /*return*/, newSignInfo];
                }
            });
        });
    };
    AuthController.prototype.injectToken = function (signUpInfo, res) {
        var authToken = {
            cID: signUpInfo.company._id,
            cName: signUpInfo.company.name,
            uID: signUpInfo.user._id,
            uName: signUpInfo.user.name
        };
        var token = this.authService.genJwtToken(authToken);
        res.cookie(process.env.TK_NAME, token);
    };
    /**
     * 사용자 로그인 시도
     * @param userInfo 로그인에 사용할 사용자 정보
     * @param res 토큰이 주입된 응답
     * @returns
     */
    AuthController.prototype.signIn = function (userInfo, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(userInfo);
                        return [4 /*yield*/, this.authService.validateUserInfo(userInfo)];
                    case 1:
                        token = _a.sent();
                        res.cookie(process.env.TK_NAME, token);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.getProfile = function (req) {
        var token_info = req.user;
        console.log(token_info);
        return token_info;
    };
    AuthController.prototype.signOut = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.clearCookie(process.env.TK_NAME);
                return [2 /*return*/];
            });
        });
    };
    AuthController.prototype.busNumValidate = function (bugNum) {
        return __awaiter(this, void 0, void 0, function () {
            var apiKey, apiUrl, postData;
            return __generator(this, function (_a) {
                bugNum = bugNum.replace(/-/g, '');
                apiKey = this.env_config.busNumValidation.api_key;
                apiUrl = this.env_config.busNumValidation.url + apiKey;
                postData = {
                    "b_no": [
                        bugNum
                    ]
                };
                return [2 /*return*/, this.httpService.post(apiUrl, postData)
                        .pipe((0, rxjs_1.map)(function (response) {
                        var res = response.data;
                        if (res["match_cnt"] == 1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }))];
            });
        });
    };
    AuthController.prototype.emailValidate = function (email, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, authCode, strAuthCode, expireDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.findUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, false]; //사용자가 존재하면 false 반환
                        }
                        else {
                            authCode = (0, crypto_1.randomInt)(1111, 9999);
                            console.log(authCode);
                            strAuthCode = (0, bcrypt_1.hashSync)(String(authCode), 10);
                            this.commonService.sendMail(email, "이메일 인증 요청 메일", '4자리 인증 코드 : ' + ("<b> " + authCode + "</b>"));
                            expireDate = new Date(Date.now() + 1000 * 60 * 5);
                            res.cookie(process.env.AUTH_EMAIL_TK_NAME, strAuthCode, { expires: expireDate });
                            return [2 /*return*/, true]; //사용자가 존재하지 않으면 true 반환
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.phoneValidate = function (hpNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.findUserByHpNumber(+hpNumber)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, false]; //사용자가 존재하면 false 반환
                        }
                        else {
                            return [2 /*return*/, true]; //사용자가 존재하지 않으면 true 반환
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.uploadCrFile = function (req, file) {
        return __awaiter(this, void 0, void 0, function () {
            var token_info, company, extension, path, fileName, oldFiles, newFileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token_info = req.user;
                        return [4 /*yield*/, this.companiesService.findById(token_info.cID)];
                    case 1:
                        company = _a.sent();
                        extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
                        path = (0, configuration_1.getCrnPath)();
                        fileName = company.comRegNum.toString();
                        return [4 /*yield*/, this.commonService.getFileNames(path, fileName)];
                    case 2:
                        oldFiles = _a.sent();
                        return [4 /*yield*/, this.commonService.deleteFiles(path, oldFiles)];
                    case 3:
                        _a.sent();
                        fileName = fileName + extension;
                        return [4 /*yield*/, this.commonService.storeFile(file, path, fileName)];
                    case 4:
                        newFileName = _a.sent();
                        return [2 /*return*/, newFileName];
                }
            });
        });
    };
    AuthController.prototype.uploadMrFile = function (req, file) {
        return __awaiter(this, void 0, void 0, function () {
            var token_info, company, extension, path, fileName, oldFiles, newFileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token_info = req.user;
                        return [4 /*yield*/, this.companiesService.findById(token_info.cID)];
                    case 1:
                        company = _a.sent();
                        extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
                        path = (0, configuration_1.getMrnPath)();
                        fileName = company.mbRegNum.toString();
                        return [4 /*yield*/, this.commonService.getFileNames(path, fileName)];
                    case 2:
                        oldFiles = _a.sent();
                        return [4 /*yield*/, this.commonService.deleteFiles(path, oldFiles)];
                    case 3:
                        _a.sent();
                        fileName = fileName + extension;
                        return [4 /*yield*/, this.commonService.storeFile(file, path, fileName)];
                    case 4:
                        newFileName = _a.sent();
                        return [2 /*return*/, newFileName];
                }
            });
        });
    };
    AuthController.prototype.getCrFileName = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var token_info, company, fileName, fileList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token_info = req.user;
                        return [4 /*yield*/, this.companiesService.findById(token_info.cID)];
                    case 1:
                        company = _a.sent();
                        fileName = company.comRegNum.toString();
                        return [4 /*yield*/, this.commonService.getFileNames((0, configuration_1.getCrnPath)(), fileName)];
                    case 2:
                        fileList = _a.sent();
                        if (fileList.length > 0) {
                            return [2 /*return*/, fileList[0]];
                        }
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.getMrFileName = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var token_info, company, fileName, fileList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token_info = req.user;
                        return [4 /*yield*/, this.companiesService.findById(token_info.cID)];
                    case 1:
                        company = _a.sent();
                        fileName = company.mbRegNum.toString();
                        return [4 /*yield*/, this.commonService.getFileNames((0, configuration_1.getMrnPath)(), fileName)];
                    case 2:
                        fileList = _a.sent();
                        if (fileList.length > 0) {
                            return [2 /*return*/, fileList[0]];
                        }
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "회원 가입", description: "업주 가입시에만 Company 데이터를 채워서 전송함" }),
        (0, swagger_1.ApiBody)({ description: "회원 가입에 필요한 정보 정보", type: auth_entity_1.SignUpInfo }),
        (0, common_1.Post)('signup'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true }))
    ], AuthController.prototype, "signUpForOwner");
    __decorate([
        __param(1, (0, common_1.Res)({ passthrough: true }))
    ], AuthController.prototype, "injectToken");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "시스템에 로그인 시도 (토큰 발급)" }),
        (0, swagger_1.ApiBody)({ description: "로그인에 사용될 정보", type: auth_entity_1.UserInfo }),
        (0, common_1.Post)('signin'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true }))
    ], AuthController.prototype, "signIn");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({ summary: "\uD504\uB85C\uD544 \uD655\uC778 (\uD1A0\uD070 \uC815\uBCF4 \uD655\uC778)" }),
        (0, common_1.Get)('profile'),
        __param(0, (0, common_1.Request)())
    ], AuthController.prototype, "getProfile");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "\uB85C\uADF8\uC544\uC6C3 (\uD1A0\uD070 \uC0AD\uC81C)" }),
        (0, common_1.Get)('signout'),
        __param(0, (0, common_1.Res)({ passthrough: true }))
    ], AuthController.prototype, "signOut");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "사업자번호 유효성 검증" }),
        (0, swagger_1.ApiParam)({ name: "id", description: "검증할 사업자번호" }),
        (0, swagger_1.ApiResponse)({ description: "사업자번호 존재여부(유효여부)", type: Boolean }),
        (0, common_1.Get)('validate/com-reg-number/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], AuthController.prototype, "busNumValidate");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "가입자 메일주소 유효성 검증 및 인증메일 발송" }),
        (0, swagger_1.ApiParam)({ name: "id", description: "가입할 메일주소" }),
        (0, swagger_1.ApiResponse)({ description: "메일주소 유효여부. 가입가능: true, 가입불가: false", type: Boolean }),
        (0, common_1.Get)('validate/email/:id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Res)({ passthrough: true }))
    ], AuthController.prototype, "emailValidate");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: "가입자 전화번호 유효성 검증" }),
        (0, swagger_1.ApiParam)({ name: "id", description: "가입할 가입자의 전화번호" }),
        (0, swagger_1.ApiResponse)({ description: "전화번호 유효여부. 가입가능: true, 가입불가: false", type: Boolean }),
        (0, common_1.Get)('validate/phone/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], AuthController.prototype, "phoneValidate");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({ summary: "사업자 등록증 업로드." }),
        (0, swagger_1.ApiConsumes)("multipart/form-data"),
        (0, swagger_1.ApiBody)({
            description: "image/jpeg|image/png|application/pdf 타입의 사업자 등록증 파일",
            schema: {
                type: 'object',
                properties: {
                    file: {
                        type: 'string',
                        format: 'binary'
                    }
                }
            }
        }),
        (0, common_1.UseInterceptors)(multer_option_1.docFileInterceptor),
        (0, common_1.Post)('upload/com-reg-doc'),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.UploadedFile)())
    ], AuthController.prototype, "uploadCrFile");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({ summary: "정비업 등록증 업로드." }),
        (0, swagger_1.ApiConsumes)("multipart/form-data"),
        (0, swagger_1.ApiBody)({
            description: "image/jpeg|image/png|application/pdf 타입의 정비업 등록증 파일",
            schema: {
                type: 'object',
                properties: {
                    file: {
                        type: 'string',
                        format: 'binary'
                    }
                }
            }
        }),
        (0, common_1.UseInterceptors)(multer_option_1.docFileInterceptor),
        (0, common_1.Post)('upload/man-reg-doc'),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.UploadedFile)())
    ], AuthController.prototype, "uploadMrFile");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({ summary: "업로드된 사업자등록증 파일명 반환" }),
        (0, swagger_1.ApiResponse)({ description: "성공: 파일명, 실패: null" }),
        (0, common_1.Get)('file-name/com-reg-docc'),
        __param(0, (0, common_1.Request)())
    ], AuthController.prototype, "getCrFileName");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiOperation)({ summary: "업로드된 정비업등록증 파일명 반환" }),
        (0, swagger_1.ApiResponse)({ description: "성공: 파일명, 실패: null" }),
        (0, common_1.Get)('file-name/man-reg-doc'),
        __param(0, (0, common_1.Request)())
    ], AuthController.prototype, "getMrFileName");
    AuthController = __decorate([
        (0, swagger_1.ApiTags)("인증 API"),
        (0, common_1.Controller)('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
