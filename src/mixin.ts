import { isInPrototypeChain } from "./is-prototype-chain";
import { validateInheritance } from "./validate-inheritance";

const forEachProperty = <T extends object>(
  currentDelegate: T,
  callback: (propName: string) => void
) => {
  Object.getOwnPropertyNames(currentDelegate).forEach(callback);
};

const isNecessaryToMixin = <Self extends object>(
  self: Self,
  propName: string
): boolean => {
  return propName !== "constructor" && !(propName in self);
};

const addProperty = <Self extends object, Delegate extends object>(
  self: Self,
  delegate: Delegate,
  propName: string
) => {
  const descriptor = Object.getOwnPropertyDescriptor(delegate, propName);
  if (descriptor) {
    Object.defineProperty(self, propName, descriptor);
  }
};

const getParentPrototype = <T extends object>(currentDelegate: T) =>
  Object.getPrototypeOf(currentDelegate);

export const mixin = <Self extends object, Delegate extends object>(
  self: Delegate,
  delegate: Self
): void => {
  validateInheritance(delegate, self);

  let currentDelegate = delegate;

  do {
    forEachProperty(currentDelegate, (propertyName) => {
      if (isNecessaryToMixin(self, propertyName)) {
        addProperty(self, currentDelegate, propertyName);
      }
    });
    currentDelegate = getParentPrototype(currentDelegate);
  } while (!isInPrototypeChain(self, currentDelegate));
};
