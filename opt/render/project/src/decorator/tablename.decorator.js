"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableName = void 0;
function TableName(name) {
    return (constructor) => {
        constructor.prototype.tableName = name;
    };
}
exports.TableName = TableName;
