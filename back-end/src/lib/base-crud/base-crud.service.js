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
exports.BaseService = void 0;
var common_1 = require("@nestjs/common");
var base_entity_1 = require("../../models/base.entity");
/* 확장 서비스 클래스용 패키지 - 아래의 내용을 확장 클래스에 주입
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
*/
var BaseService = /** @class */ (function () {
    /* 자식 서비스 클래스용 생성자 - 아래의 내용을 자식 클래스에 삽입
    constructor(@InjectModel(EntityClass) readonly model: ReturnModelType<typeof EntityClass>) {
        super(model);
    }
    */
    function BaseService(model) {
        this.model = model;
    }
    ;
    BaseService.prototype.create = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 더미 데이터 생성용
                        // for (var i = 0; i < 1000; i++) {
                        //     doc["name"] = "cb park" + i;
                        //     doc["createdAt"] = new Date(+Date.now());
                        //     var newDoc = await this.model.create(doc);
                        // }
                        // return newDoc;
                        // doc.createdAt = new Date(Date.now());
                        console.log("service => db");
                        console.log(doc);
                        doc.createdAt = new Date(Date.now());
                        return [4 /*yield*/, this.model.create(doc)];
                    case 1:
                        result = _a.sent();
                        console.log("service <= db");
                        console.log(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    BaseService.prototype.findByOptions = function (pOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var searchOption, currentPage, skipOption, limitOption, pr, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log(pOptions);
                        console.log(pOptions.getQuery());
                        searchOption = {};
                        if (pOptions.searchField && pOptions.searchKeyword) {
                            if (pOptions.useRegSearch === true) {
                                searchOption[pOptions.searchField] = { $regex: pOptions.searchKeyword, $options: '$i' };
                            }
                            else {
                                searchOption[pOptions.searchField] = pOptions.searchKeyword;
                            }
                        }
                        currentPage = pOptions.page;
                        skipOption = (currentPage - 1) * (pOptions.take);
                        limitOption = (pOptions.take);
                        pr = new base_entity_1.PaginateResult();
                        _a = pr;
                        return [4 /*yield*/, this.model.countDocuments(searchOption)];
                    case 1:
                        _a.totalDocs = _c.sent();
                        pr.currentPage = pOptions.page;
                        pr.lastPage = Math.ceil(pr.totalDocs / limitOption);
                        _b = pr;
                        return [4 /*yield*/, this.model.find(searchOption).skip(skipOption).limit(limitOption)];
                    case 2:
                        _b.docs = _c.sent();
                        return [2 /*return*/, pr];
                }
            });
        });
    };
    BaseService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseService.prototype.update = function (id, doc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 변경되면 안되는 필드 데이터 삭제
                        delete doc._id;
                        delete doc.createdAt;
                        // 갱신 시점 주입
                        doc.updatedAt = new Date(Date.now());
                        return [4 /*yield*/, this.model.findByIdAndUpdate(id, doc, { "new": true })];
                    case 1: 
                    // const newDoc: any = doc;
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findById(id).deleteOne()];
                    case 1: 
                    // return await this.model.findByIdAndRemove(id);
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseService = __decorate([
        (0, common_1.Injectable)()
    ], BaseService);
    return BaseService;
}());
exports.BaseService = BaseService;
