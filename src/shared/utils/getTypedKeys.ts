const getTypedKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;

export default getTypedKeys;
