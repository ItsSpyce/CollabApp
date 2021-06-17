export default class Breakpoint {
  constructor(public value: string) {}

  at = () => `@media (min-width: ${this.value})`;

  toString() {
    return this.value;
  }

  static SMALL = new Breakpoint('320px');

  static MEDIUM = new Breakpoint('768px');

  static LARGE = new Breakpoint('1024px');
}
