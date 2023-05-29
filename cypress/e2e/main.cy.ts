describe('E2E Test', () => {
  context('Check app flow', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('check for temperature to be displayed', () => {
      cy.get_celcius();
      cy.get('input[type="text"]').should('exist').type('Barranquilla');

      cy.temperature('Celsius');
    });
    it('check that Celsius units work', () => {
      cy.get_celcius();
      cy.get('input[type="text"]').should('exist').type('Barranquilla');
      cy.wait('@getWeatherDataMetric');
      cy.contains('Temperature: 32.88°C').should('exist').should('be.visible');
    });
    it('check that Fahrenheit units work', () => {
      cy.temperature('Fahrenheit');
      cy.get_faren();
      cy.get('input[type="text"]').should('exist').type('Barranquilla');
      cy.contains('Temperature: 91.18°F').should('exist').should('be.visible');
    });
  });

  context('validate GET 200 code weather', () => {
    it('Get weather data for a location - 200', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('URL')}?q=${Cypress.env(
          'LOCATION'
        )}&appid=${Cypress.env('APP_ID')}`,
      }).then((response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.isOkStatusCode).to.eq(true);
        expect(response.body).to.have.all.keys(
          'base',
          'clouds',
          'cod',
          'coord',
          'dt',
          'id',
          'main',
          'name',
          'rain',
          'sys',
          'timezone',
          'visibility',
          'weather',
          'wind'
        );
        assert.isObject(response.body.clouds, 'val is object');
        expect(response.body.clouds).to.have.keys('all');
        assert.isObject(response.body.coord, 'val is object');
        expect(response.body.coord).to.have.keys('lat', 'lon');
        assert.isObject(response.body.main, 'val is object');
        expect(response.body.main).to.have.keys(
          'feels_like',
          'humidity',
          'pressure',
          'temp',
          'temp_max',
          'temp_min'
        );
        assert.isObject(response.body.rain, 'val is object');
        expect(response.body.rain).to.have.keys('1h');
        assert.isObject(response.body.sys, 'val is object');
        expect(response.body.sys).to.have.keys(
          'country',
          'id',
          'sunrise',
          'sunset',
          'type'
        );
        assert.isObject(response.body.wind, 'val is object');
        expect(response.body.wind).to.have.keys('deg', 'speed');
        assert.isArray(response.body.weather, 'val is array');
      });
    });
  });
});
