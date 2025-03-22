export const isInPrototypeChain = (object: any, target: any): boolean => {
  let prototype = Object.getPrototypeOf(object);

  while (prototype != null) {
    if (prototype === target) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }

  return false;
};
