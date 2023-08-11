"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbIgnore = void 0;
function DbIgnore() {
    return function (target, propertyName) {
        target.dbIgnoreProps = [...(target.dbIgnoreProps || [])];
        target.dbIgnoreProps.push(propertyName);
    };
}
exports.DbIgnore = DbIgnore;
