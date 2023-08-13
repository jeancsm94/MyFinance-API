import express from "express";
import { LancamentoService } from "../services/lancamentos/lancamento.service";
import { LancamentoRepository } from "../repositories/lancamentos/lancamento.repository";
import { Lancamentos } from "../entities/lancamentos";
import { MongoService } from "../services/mongo/mongo.service";
import { ObjectId } from "mongodb";
import { LancamentoCollection } from "../services/mongo/collections/collections-entities/lancamentoCollection";

export const LancamentoController = express.Router();
const service = new LancamentoService(
    new LancamentoRepository(new MongoService(), new Lancamentos(), new LancamentoCollection())
);

LancamentoController.get("/api/lancamento/", (req, res) => {
    service.getAll().then((lancamentos) => {
        res.json(lancamentos);
    });
});

LancamentoController.get("/api/lancamento/:id", (req, res) => {
    const { id } = req.params;
    service.getById(id).then((lancamento) => {
        res.json(lancamento);
    });
});

LancamentoController.put("/api/lancamento/:id", (req, res) => {
    let newLancamanto = new LancamentoCollection();

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

LancamentoController.delete("/api/lancamento/:id", (req, res) => {
    const { id } = req.params;
 
    service.delete(id).then((lancamento) => {
        res.json(lancamento);
    });
});

LancamentoController.post("/api/lancamento/", (req, res) => {
    let newLancamanto = new LancamentoCollection();

    const {nome,data, dataPagamento, formaPagamento, categoria, tipoLancamento, valor }: LancamentoCollection = req.body;

    newLancamanto._id = new ObjectId();
    newLancamanto.nome = nome;
    newLancamanto.data = data;
    newLancamanto.valor = valor;
    newLancamanto.dataPagamento = dataPagamento;
    newLancamanto.formaPagamento = formaPagamento;
    newLancamanto.tipoLancamento = tipoLancamento;
    newLancamanto.categoria = categoria;
    
    service.insert(newLancamanto).then((lancamentos) => {
        res.json(lancamentos.insertedId);
    });
});