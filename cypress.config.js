const { defineConfig } = require('cypress');
const cypressSplit = require('cypress-split');
const cucumber = require('cypress-cucumber-preprocessor').default;
const { readFileSync } = require('fs');

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    fixturesFolder: false,
    supportFile: false,
    setupNodeEvents(on, config) {
      cypressSplit(on, config);

      on('file:preprocessor', cucumber());
      const envName = config.env.name;
      const text = readFileSync(`./${envName}.json`);
      const values = JSON.parse(text);

      config.env = {
        ...values.env,
      };
      // IMPORTANT: return the config object
      return config;
    },
    specPattern: 'cypress/e2e/**/*.feature',
  },
});
