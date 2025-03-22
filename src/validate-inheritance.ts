import { MixinException } from "./mixin-exception";

const isSubclassOf = (subClass: Function, superClass: Function): boolean => {
  let proto = subClass.prototype;
  do {
    if (proto === superClass.prototype) return true;
  } while ((proto = Object.getPrototypeOf(proto)));
  return false;
};

export const validateInheritance = <
  Self extends object,
  Delegate extends object
>(
  self: Delegate,
  delegate: Self
): void => {
  const Delegate = delegate.constructor;
  const Self = self.constructor;

  if (isSubclassOf(Delegate, Self)) throw new MixinException(Delegate, Self);
  if (isSubclassOf(Self, Delegate)) throw new MixinException(Self, Delegate);
};
