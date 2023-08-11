"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LancamentoController = void 0;
const express_1 = __importDefault(require("express"));
const lancamento_service_1 = require("../services/lancamentos/lancamento.service");
const lancamento_repository_1 = require("../repositories/lancamentos/lancamento.repository");
const lancamentos_1 = require("../entities/lancamentos");
const mongo_service_1 = require("../services/mongo/mongo.service");
exports.LancamentoController = express_1.default.Router();
const service = new lancamento_service_1.LancamentoService(new lancamento_repository_1.LancamentoRepository(new mongo_service_1.MongoService(), new lancamentos_1.Lancamentos()));
exports.LancamentoController.get("/api/lancamento/", (req, res) => {
    service.getAll().then((lancamentos) => {
        res.json(lancamentos);
    });
});
exports.LancamentoController.get("/api/lancamento/:id", (req, res) => {
    const { id } = req.params;
    service.getById(id).then((lancamento) => {
        res.json(lancamento);
    });
});
exports.LancamentoController.put("/api/lancamento/:id", (req, res) => {
    let newLancamanto = new lancamentos_1.Lancamentos();
    const { id } = req.params;
    // newLancamanto.nome = nome;
    // newLancamanto.data = data;
    // newLancamanto.valor = valor;
    // newLancamanto.dataPagamento = dataPagamento;
    // newLancamanto.formaPagamento = formaPagamento;
    // newLancamanto.tipoLancamento = tipoLancamento;
    // newLancamanto.categoria = categoria;
    service.update(id, newLancamanto).then((lancamentos) => {
        res.json(lancamentos);
    });
});
exports.LancamentoController.delete("/api/lancamento/:id", (req, res) => {
    const { id } = req.params;
    service.delete(id).then((lancamento) => {
        res.json(lancamento);
    });
});
exports.LancamentoController.post("/api/lancamento/", (req, res) => {
    let newLancamanto = new lancamentos_1.Lancamentos();
    // const { id } = req.params;
    // newLancamanto.nome = nome;
    // newLancamanto.data = data;
    // newLancamanto.valor = valor;
    // newLancamanto.dataPagamento = dataPagamento;
    // newLancamanto.formaPagamento = formaPagamento;
    // newLancamanto.tipoLancamento = tipoLancamento;
    // newLancamanto.categoria = categoria;
    service.insert(newLancamanto).then((lancamentos) => {
        res.json(lancamentos);
    });
});
