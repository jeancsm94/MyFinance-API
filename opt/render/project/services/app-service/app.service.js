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
exports.AppService = void 0;
const mongodb_1 = require("mongodb");
class AppService {
    constructor(mongoService, lancamentoService) {
        Object.defineProperty(this, "mongoService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: mongoService
        });
        Object.defineProperty(this, "lancamentoService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: lancamentoService
        });
        Object.defineProperty(this, "initApp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => __awaiter(this, void 0, void 0, function* () {
                console.log("Iniciando a criação da base de Dados");
                yield this.mongoService.initDB();
                //await this.testeAPI();
            })
        });
        Object.defineProperty(this, "testeAPI", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => __awaiter(this, void 0, void 0, function* () {
                console.log('Teste Inserção lancamento');
                try {
                    let lancamento = {
                        valor: 300,
                        _id: mongodb_1.ObjectId.createFromTime(new Date().getTime()),
                        categoria: "Vetuário",
                        data: new Date(),
                        dataPagamento: new Date(),
                        formaPagamento: "PIX",
                        nome: "Reggla",
                        tipoLancamento: {
                            categoriaLancamento: "Despesa",
                            tipo: "Variável",
                        },
                    };
                    yield this.lancamentoService.insert(lancamento);
                    const getEntity = yield this.lancamentoService.getById('c19c54ac0000000000000000');
                    const getAll = yield this.lancamentoService.getAll();
                    lancamento = {
                        valor: 400,
                        _id: mongodb_1.ObjectId.createFromTime(new Date().getTime()),
                        categoria: "Vetuário",
                        data: new Date(),
                        dataPagamento: new Date(),
                        formaPagamento: "PIX",
                        nome: "Reggla",
                        tipoLancamento: {
                            categoriaLancamento: "Despesa",
                            tipo: "Variável",
                        },
                    };
                    const updateLancamento = yield this.lancamentoService.update('c19c54ac0000000000000000', lancamento);
                    const removeLancamento = yield this.lancamentoService.delete('c1dd8a5d0000000000000000');
                    console.log('Retorno FindById: ' + getEntity.nome);
                    console.log('Retorno FindAll: ' + getAll);
                    console.log('Retorno updateLancamento: ' + updateLancamento.id);
                    console.log('Retorno removeLancamento True or false: ' + removeLancamento);
                    console.log('Deu bom');
                }
                catch (error) {
                    console.log('Deu BO');
                    console.log(error);
                }
            })
        });
    }
}
exports.AppService = AppService;
