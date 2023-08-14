import { Base } from "../entities/base";
import { IBase } from "../interface/base.interface";
import { IBaseController } from "../interface/baseController.interface";
import { BaseService } from "../services/baseService";
import express from "express";

export class BaseController<T extends Base, B extends BaseService> implements IBaseController<T> {
    public router: express.Router = express.Router();

    constructor(protected service: B) {
        this.router = express.Router();
    }

    getById(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    update(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    save(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}