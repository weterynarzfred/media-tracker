export default class Enum {
  constructor(values) {
    values.forEach(value => this[value] = Symbol(value));
    Object.freeze(this);
    return new Proxy(this, { get: (target, p) => target[p] ?? Symbol(null) });
  }
}
