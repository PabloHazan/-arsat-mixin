"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixinException = void 0;
class MixinException extends Error {
    constructor(Delegate, Self) {
        super(`${Delegate.name} is a subclass of ${Self.name}. Mixin is not allowed.`);
    }
}
exports.MixinException = MixinException;
//# sourceMappingURL=mixin-exception.js.map