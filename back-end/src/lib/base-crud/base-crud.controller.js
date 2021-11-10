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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.BaseControllerFactory = exports.AbstractValidationPipe = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var base_entity_1 = require("../../models/base.entity");
var AbstractValidationPipe = /** @class */ (function (_super) {
    __extends(AbstractValidationPipe, _super);
    function AbstractValidationPipe(options, targetTypes) {
        var _this = _super.call(this, options) || this;
        _this.targetTypes = targetTypes;
        return _this;
    }
    AbstractValidationPipe.prototype.transform = function (value, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var targetType;
            return __generator(this, function (_a) {
                targetType = this.targetTypes[metadata.type];
                if (!targetType) {
                    return [2 /*return*/, _super.prototype.transform.call(this, value, metadata)];
                }
                return [2 /*return*/, _super.prototype.transform.call(this, value, __assign(__assign({}, metadata), { metatype: targetType }))];
            });
        });
    };
    AbstractValidationPipe = __decorate([
        (0, common_1.Injectable)()
    ], AbstractValidationPipe);
    return AbstractValidationPipe;
}(common_1.ValidationPipe));
exports.AbstractValidationPipe = AbstractValidationPipe;
function BaseControllerFactory(bodyDto) {
    var BaseController = /** @class */ (function () {
        function BaseController(baseService) {
            this.baseService = baseService;
        }
        BaseController.prototype.create = function (doc) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.baseService.create(doc)];
                });
            });
        };
        BaseController.prototype.findByOptions = function (findQuery) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log(findQuery);
                    return [2 /*return*/, this.baseService.findByOptions(findQuery)];
                });
            });
        };
        BaseController.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.baseService.findById(id)];
                });
            });
        };
        BaseController.prototype.update = function (id, doc) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("update in BaseController");
                    console.log(doc);
                    return [2 /*return*/, this.baseService.update(id, doc)];
                });
            });
        };
        BaseController.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.baseService.remove(id)];
                });
            });
        };
        __decorate([
            (0, common_1.Post)(),
            (0, swagger_1.ApiOperation)({ summary: "\uC0C8\uB85C\uC6B4 " + bodyDto.name + " \uB370\uC774\uD130 \uCD94\uAC00" }),
            (0, swagger_1.ApiBody)({ description: "\uCD94\uAC00\uD560 " + bodyDto.name + " \uB370\uC774\uD130", type: bodyDto }),
            (0, swagger_1.ApiCreatedResponse)({ description: "\uCD94\uAC00\uB41C " + bodyDto.name + " \uB370\uC774\uD130", type: bodyDto }),
            __param(0, (0, common_1.Body)())
        ], BaseController.prototype, "create");
        __decorate([
            (0, common_1.Get)(),
            (0, swagger_1.ApiOperation)({ summary: "\uC870\uAC74\uC5D0 \uD574\uB2F9\uD558\uB294 " + bodyDto.name + " \uBC30\uC5F4 \uB370\uC774\uD130\uB97C \uD398\uC774\uC9D5 \uC815\uBCF4\uC640 \uD568\uAED8 \uBC18\uD658" }),
            (0, swagger_1.ApiQuery)({ description: "검색 조건", type: base_entity_1.PaginateOptions }),
            (0, swagger_1.ApiResponse)({ description: "\uAC80\uC0C9\uB41C " + bodyDto.name + " \uBC30\uC5F4 \uB370\uC774\uD130\uC640 \uD398\uC774\uC9D5 \uC815\uBCF4", type: base_entity_1.PaginateResult }),
            __param(0, (0, common_1.Query)())
        ], BaseController.prototype, "findByOptions");
        __decorate([
            (0, common_1.Get)(':id'),
            (0, swagger_1.ApiOperation)({ summary: "id\uC5D0 \uD574\uB2F9\uD558\uB294 " + bodyDto.name + " \uB370\uC774\uD130 \uBC18\uD658" }),
            (0, swagger_1.ApiParam)({ name: "id", description: "\uD574\uB2F9 " + bodyDto.name + "\uC758 \uC624\uBE0C\uC81D\uD2B8 ID" }),
            (0, swagger_1.ApiResponse)({ description: "\uAC80\uC0C9\uB41C " + bodyDto.name + " \uB370\uC774\uD130", type: bodyDto }),
            __param(0, (0, common_1.Param)('id'))
        ], BaseController.prototype, "findById");
        __decorate([
            (0, common_1.Patch)(':id'),
            (0, swagger_1.ApiOperation)({ summary: "id\uC5D0 \uD574\uB2F9\uD558\uB294 " + bodyDto.name + " \uB370\uC774\uD130 \uAC31\uC2E0" }),
            (0, swagger_1.ApiParam)({ name: "id", description: "\uD574\uB2F9 " + bodyDto.name + "\uC758 \uC624\uBE0C\uC81D\uD2B8 ID" }),
            (0, swagger_1.ApiBody)({ description: "\uAC31\uC2E0\uB41C " + bodyDto.name + " \uB370\uC774\uD130", type: bodyDto }),
            __param(0, (0, common_1.Param)('id')),
            __param(1, (0, common_1.Body)())
        ], BaseController.prototype, "update");
        __decorate([
            (0, common_1.Delete)(':id'),
            (0, swagger_1.ApiOperation)({ summary: "id\uC5D0 \uD574\uB2F9\uD558\uB294 " + bodyDto.name + " \uB370\uC774\uD130 \uC0AD\uC81C" }),
            (0, swagger_1.ApiParam)({ name: "id", description: "\uD574\uB2F9 " + bodyDto.name + "\uC758 \uC624\uBE0C\uC81D\uD2B8 ID" }),
            (0, swagger_1.ApiResponse)({ description: "\uC0AD\uC81C\uB41C " + bodyDto.name + " \uB370\uC774\uD130\uC758 \uC218", type: base_entity_1.DeleteResult }),
            __param(0, (0, common_1.Param)('id'))
        ], BaseController.prototype, "remove");
        BaseController = __decorate([
            (0, common_1.Controller)()
            // 가드 적용: 로그인 된 연결만을 허용
            // @UseGuards(JwtAuthGuard)
            // 파이프 적용: DTO 데이터 검증
            ,
            (0, common_1.UsePipes)(new AbstractValidationPipe({
                whitelist: true, forbidNonWhitelisted: false, transform: true
            }, { body: bodyDto }))
        ], BaseController);
        return BaseController;
    }());
    return BaseController;
}
exports.BaseControllerFactory = BaseControllerFactory;
