import { DbIgnore } from "../decorator/db-ignore.decorator";
import { IBase } from "../interface/base.interface";
import { ObjectId, OptionalId,  } from 'mongodb';

export class Base implements IBase {
    
    constructor() {
        this.constructor.prototype.dbIgnoreProps = this.constructor.prototype.dbIgnoreProps || [];
        this.constructor.prototype.childrenTablesProps = this.constructor.prototype.childrenTablesProps || [];
      }
    _id: ObjectId;
    lastUpdated: Date = new Date();
    @DbIgnore()
    tableName: string;
    @DbIgnore()
    childrenTablesProps?: { propertyName: string; typeInstance: Base }[];
    @DbIgnore()
    dbIgnoreProps?: string[];

}