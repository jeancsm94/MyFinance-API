"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LancamentoRepository = void 0;
const repositoryBase_1 = require("../repositoryBase");
class LancamentoRepository extends repositoryBase_1.RepositoryBase {
    constructor(mongo, entity) {
        super(mongo, entity);
    }
}
exports.LancamentoRepository = LancamentoRepository;
