"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const db_ignore_decorator_1 = require("../decorator/db-ignore.decorator");
class Base {
    constructor() {
        Object.defineProperty(this, "_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lastUpdated", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Date()
        });
        Object.defineProperty(this, "tableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "childrenTablesProps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dbIgnoreProps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.dbIgnoreProps = this.constructor.prototype.dbIgnoreProps || [];
        this.childrenTablesProps = this.constructor.prototype.childrenTablesProps || [];
        this.tableName = this.constructor.prototype.tableName || '';
    }
}
exports.Base = Base;
__decorate([
    (0, db_ignore_decorator_1.DbIgnore)()
], Base.prototype, "tableName", void 0);
__decorate([
    (0, db_ignore_decorator_1.DbIgnore)()
], Base.prototype, "childrenTablesProps", void 0);
__decorate([
    (0, db_ignore_decorator_1.DbIgnore)()
], Base.prototype, "dbIgnoreProps", void 0);
