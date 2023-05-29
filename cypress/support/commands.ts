Cypress.Commands.add('temperature', (unit: 'Fahrenheit' | 'Celsius') => {
  cy.contains(unit).click();
});

Cypress.Commands.add('get_celcius', () => {
  cy.intercept(
    {
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather**`,
    },
    { fixture: 'metric.json' }
  ).as('getWeatherDataMetric');
});

Cypress.Commands.add('get_faren', () => {
  cy.intercept(
    {
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather**`,
    },
    { fixture: 'imperial.json' }
  ).as('getWeatherDataImperial');
});

export {};
