'use strict';
const getDay = require('date-fns/getDay');
const format = require('date-fns/format');
const { start } = require('./start');

require('dotenv').config();

const sleep = (ms, dev = 1) => {
  const msWithDev = ((Math.random() * dev) + 1) * ms;
  // console.log('Waiting', Math.round(msWithDev / 1000), 'sec');
  return new Promise(resolve => setTimeout(resolve, msWithDev));
};

const StartAuto = async (browser, options) => {
  const {
    loginUrl,
    registroUrl,
    registersDbPath,
    username,
    password,
    latitude,
    longitude,
    logger = console,
  } = options;

  let page = await browser.newPage();
  const context = browser.defaultBrowserContext();
  await context.overridePermissions(registroUrl, ['geolocation']);
  await page.setGeolocation({ longitude, latitude });

  await page.goto(`${loginUrl}/`);

  await page.setCacheEnabled(true);

  await page.type('input[name="login"]', username, { delay: 50 });
  await page.type('input[name="password"]', password, { delay: 50 });
  const loginButton = (await page.$x("//button[.//text() = 'Entrar']"))[0];
  await loginButton.click();

  return page;

};

const ChecarTime = async (diasSemana, horarios, page) => {
  setInterval(() => {
    try {
      let diaSemana = getDay(new Date())
      if (diasSemana.indexOf(diaSemana) !== -1) {
        let hora = format(new Date(), "HH")
        if (horarios.indexOf(String(hora)) !== -1) {
          let minutos = format(new Date(), "mm").toString()
          if (minutos === "00") {
            console.log(`Batendo ${horarios.indexOf(String(hora)) + 1}º ponto: ${hora}:${minutos}`)
            BaterPonto(page);
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, 60000);
};

const BaterPonto = async (page) => {
  try {
    const url = process.env.PONTO_REGISTRO_URL;
    const currentUrl = page.url();
    if (currentUrl !== url) {
      await page.goto(url);
      await sleep(30000);
    }

    const pontoButton = (await page.$x("//button[.//text() = 'Registrar ponto']"))[0];
    await pontoButton.click();
    await sleep(8000); // Aguardar para fechar a mensagem de registro
    await page.evaluate(() => {
      const elements = document.getElementsByClassName('close ng-scope');
      for (const element of elements)
        element.click();
    });
    return page;
  } catch (error) {
    console.log("Houve uma falha ao tentar bater ponto tentando novamente!", error)
    start();
  }
};


module.exports = { StartAuto, ChecarTime };