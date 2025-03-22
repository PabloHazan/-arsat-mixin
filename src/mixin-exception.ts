export class MixinException extends Error {
  constructor(Delegate: Function, Self: Function) {
    super(
      `${Delegate.name} is a subclass of ${Self.name}. Mixin is not allowed.`
    );
  }
}
