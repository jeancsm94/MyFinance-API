import { T } from "../type/generictype";
import { IBase } from "./base.interface";

export interface IBaseController<T extends IBase> {
    getById():Promise<T>;
    getAll():Promise<T[]>;
    update():Promise<any>;
    delete():Promise<any>;
    save():Promise<any>;
}