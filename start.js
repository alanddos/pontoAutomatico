require('dotenv').config();
const puppeteer = require('puppeteer'); // eslint-disable-line import/no-extraneous-dependencies

const { StartAuto, ChecarTime } = require('./autoBot'); // eslint-disable-line import/no-unresolved

const start = async () => {
  let browser;

  try {
    browser = await puppeteer.launch({ headless: false });
    const horarios = process.env.PONTO_HORARIOS.replace('[', '').replace(']', '').split(',').map(v => v);
    const diasSemana = JSON.parse(process.env.PONTO_DIAS_SEMANA);
    
    const options = {
      registersDbPath: './registers.json',
      loginUrl: process.env.PONTO_LOGIN_URL,
      registroUrl: process.env.PONTO_REGISTRO_URL,
      username: process.env.PONTO_USERNAME,
      password: process.env.PONTO_PASSWORD,
      latitude: parseFloat(process.env.PONTO_LATITUDE),
      longitude: parseFloat(process.env.PONTO_LONGITUDE)
    };

    const page = await StartAuto(browser, options);

    ChecarTime(diasSemana, horarios, page);

    console.log('Done running');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { start };
