import { Request, Response, Router } from "express";
import { Lancamentos } from "./entities/lancamentos";
import { ILancamentos } from "./interface/lancamento.interface";
import { RepositoryBase } from "./repositories/repositoryBase";
import { AppService } from "./services/app-service/app.service";
import { LancamentoService } from "./services/lancamentos/lancamento.service";
import { MongoService } from "./services/mongo/mongo.service";
import { port } from "./configs/enviroment";
import { LancamentoController } from "./controller/lancamento.controller";
const express = require("express");

const server = express();
const router = express.Router();
const app = new AppService(
    new MongoService(),
    new LancamentoService(
        new RepositoryBase(new MongoService(), new Lancamentos())
    )
);

console.log("Iniciando Projeto!");
app.initApp();

server.use(function (res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-type, Accept, Authorization"
            );
            next();
        });
        
server.use(express.json());
server.get("/api/", (req: Request, res: Response) => {
    res.json('Hello ')
});

server.use(LancamentoController);

server.listen(port, ()=> console.log(`API iniciada com sucesso http://localhost:${port}`));