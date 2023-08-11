"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    set project(project) {
        this._project = project;
    }
    get project() {
        return this._project;
    }
    constructor(repository) {
        Object.defineProperty(this, "repository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: repository
        });
        Object.defineProperty(this, "_project", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    insert(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.insert(item);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findById(id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findAll();
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(id, item);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(id);
        });
    }
}
exports.BaseService = BaseService;
