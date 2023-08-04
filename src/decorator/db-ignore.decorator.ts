export function DbIgnore(): any {
    return function (target: any, propertyName: string) {
      target.dbIgnoreProps = [...(target.dbIgnoreProps || [])];
      target.dbIgnoreProps.push(propertyName);
    };
  }