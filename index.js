'use strict';

const puppeteer = require('puppeteer'); // eslint-disable-line import/no-extraneous-dependencies

const { StartAuto, ChecarTime } = require('./autoBot'); // eslint-disable-line import/no-unresolved

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });

    const diasSemana = [1, 2, 3, 4, 5]; // 0 = domingo 1 seg a 5 sex pode bater o ponto
    const horarios = ['08', '12', '13', '18']; // horarios para bater o ponto

    const options = {
      registersDbPath: './registers.json',
      loginUrl: 'https://app.pontomaisweb.com.br/#/acessar',
      username: '',
      password: '',      
    };

    const page = await StartAuto(browser, options);

    ChecarTime(diasSemana, horarios, page);

    console.log('Done running');
    } catch (err) {
    console.error(err);
  }
})();
