export function TableName(name: string){
    return (constructor: Function) => {
        constructor.prototype.tableName = name;
    }
}