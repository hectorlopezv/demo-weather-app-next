import './commands';
declare global {
  namespace Cypress {
    interface Chainable {
      temperature(unit: 'Fahrenheit' | 'Celsius'): Chainable<Element>;
      get_celcius(): Chainable<Element>;
      get_faren(): Chainable<Element>;
    }
  }
}
