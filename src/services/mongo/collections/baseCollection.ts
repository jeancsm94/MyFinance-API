import { ObjectId } from "mongodb";
import { IBase } from "../../../interface/base.interface";

export class BaseCollection implements IBase {
    _id?: ObjectId;
    lastUpdated?: Date = new Date();
}