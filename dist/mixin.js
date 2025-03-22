"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixin = void 0;
const is_prototype_chain_1 = require("./is-prototype-chain");
const validate_inheritance_1 = require("./validate-inheritance");
const forEachProperty = (currentDelegate, callback) => {
    Object.getOwnPropertyNames(currentDelegate).forEach(callback);
};
const isNecessaryToMixin = (self, propName) => {
    return propName !== "constructor" && !(propName in self);
};
const addProperty = (self, delegate, propName) => {
    const descriptor = Object.getOwnPropertyDescriptor(delegate, propName);
    if (descriptor) {
        Object.defineProperty(self, propName, descriptor);
    }
};
const getParentPrototype = (currentDelegate) => Object.getPrototypeOf(currentDelegate);
const mixin = (self, delegate) => {
    (0, validate_inheritance_1.validateInheritance)(delegate, self);
    let currentDelegate = delegate;
    do {
        forEachProperty(currentDelegate, (propertyName) => {
            if (isNecessaryToMixin(self, propertyName)) {
                addProperty(self, currentDelegate, propertyName);
            }
        });
        currentDelegate = getParentPrototype(currentDelegate);
    } while (!(0, is_prototype_chain_1.isInPrototypeChain)(self, currentDelegate));
};
exports.mixin = mixin;
//# sourceMappingURL=mixin.js.map