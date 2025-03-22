"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInheritance = void 0;
const mixin_exception_1 = require("./mixin-exception");
const isSubclassOf = (subClass, superClass) => {
    let proto = subClass.prototype;
    do {
        if (proto === superClass.prototype)
            return true;
    } while ((proto = Object.getPrototypeOf(proto)));
    return false;
};
const validateInheritance = (self, delegate) => {
    const Delegate = delegate.constructor;
    const Self = self.constructor;
    if (isSubclassOf(Delegate, Self))
        throw new mixin_exception_1.MixinException(Delegate, Self);
    if (isSubclassOf(Self, Delegate))
        throw new mixin_exception_1.MixinException(Self, Delegate);
};
exports.validateInheritance = validateInheritance;
//# sourceMappingURL=validate-inheritance.js.map