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
const vitest_1 = require("vitest");
const app_service_1 = require("../app-service/app.service");
const mongo_service_1 = require("../mongo/mongo.service");
const lancamento_service_1 = require("./lancamento.service");
const repositoryBase_1 = require("../../repositories/repositoryBase");
const lancamentos_1 = require("../../entities/lancamentos");
const faker_1 = require("@faker-js/faker");
const mongodb_1 = require("mongodb");
// c19c54ac0000000000000000
(0, vitest_1.describe)("CRUD Lançamentos", () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new app_service_1.AppService(new mongo_service_1.MongoService(), new lancamento_service_1.LancamentoService(new repositoryBase_1.RepositoryBase(new mongo_service_1.MongoService(), new lancamentos_1.Lancamentos())));
    const lancamentoService = new lancamento_service_1.LancamentoService(new repositoryBase_1.RepositoryBase(new mongo_service_1.MongoService(), new lancamentos_1.Lancamentos()));
    yield app.initApp();
    yield (0, vitest_1.test)("CREATE: Insert Lançamento", () => __awaiter(void 0, void 0, void 0, function* () {
        let lancamento = new lancamentos_1.Lancamentos();
        lancamento = {
            _id: new mongodb_1.ObjectId(),
            nome: faker_1.faker.finance.currency().name,
            data: new Date(),
            valor: parseInt(faker_1.faker.finance.amount()),
            dataPagamento: new Date(),
            formaPagamento: "PIX",
            categoria: "undefined",
            tipoLancamento: {
                categoriaLancamento: "Despesa",
                tipo: "Variável"
            }
        };
        const result = yield lancamentoService.insert(lancamento);
        (0, vitest_1.expect)(result.acknowledged).toBe(true);
    }));
    yield (0, vitest_1.test)("READ: GetbyId Lançamento id: c19c54ac0000000000000000", () => __awaiter(void 0, void 0, void 0, function* () {
        const lancamento = yield lancamentoService.getById('c19c54ac0000000000000000');
        (0, vitest_1.expect)(lancamento.nome).eq('Salário');
    }));
    yield (0, vitest_1.test)("READ: Getall Lançamentos", () => __awaiter(void 0, void 0, void 0, function* () {
        const lancamento = yield lancamentoService.getAll();
        (0, vitest_1.expect)(lancamento.length).gt(0);
    }));
    yield (0, vitest_1.test)("UPDATE: UPDATE Lançamento id: c1ded7840000000000000000", () => __awaiter(void 0, void 0, void 0, function* () {
        let lancamento = yield lancamentoService.getById('c1ded7840000000000000000');
        lancamento = {
            nome: faker_1.faker.finance.currency().name,
            data: new Date(),
            valor: parseInt(faker_1.faker.finance.amount()),
            dataPagamento: new Date(),
            formaPagamento: "PIX",
            categoria: "undefined",
            tipoLancamento: {
                categoriaLancamento: "Despesa",
                tipo: "Variável"
            }
        };
        const updateLancamento = yield lancamentoService.update('c1e00c480000000000000000', lancamento);
        (0, vitest_1.expect)(updateLancamento.ok).toBe(1);
    }));
    yield (0, vitest_1.test)("DELETE: Lançamento id: c1e00c480000000000000000", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lancamentoService.delete('c1ded7840000000000000000');
        (0, vitest_1.expect)(result).toBe(true);
    }));
}));
