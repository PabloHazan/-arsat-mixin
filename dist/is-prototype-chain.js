"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInPrototypeChain = void 0;
const isInPrototypeChain = (object, target) => {
    let prototype = Object.getPrototypeOf(object);
    while (prototype != null) {
        if (prototype === target) {
            return true;
        }
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
};
exports.isInPrototypeChain = isInPrototypeChain;
//# sourceMappingURL=is-prototype-chain.js.map