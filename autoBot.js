'use strict';
const getDay = require('date-fns/getDay');
const format = require('date-fns/format');

const sleep = (ms, dev = 1) => {
  const msWithDev = ((Math.random() * dev) + 1) * ms;
  console.log('Waiting', Math.round(msWithDev / 1000), 'sec');
  return new Promise(resolve => setTimeout(resolve, msWithDev));
};


const StartAuto = async (browser, options) => {
  const {
    loginUrl,
    registersDbPath,
    username,
    password,
    logger = console,
  } = options;

  let page = await browser.newPage();
  await page.setCacheEnabled(true);
  await page.evaluateOnNewDocument(function () {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        cb({
          'coords': {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: -22.256466200833817,
            longitude: -54.80682928776344,
            speed: null
          }
        })
      }, 1000)
    }
  });

  // Not sure if we can set cookies before having gone to a page
  await page.goto(`${loginUrl}/`);

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
          console.log(`${hora}:${minutos}`)
          if (minutos === "00") {
            console.log(`Batendo ${horarios.indexOf(String(hora)) + 1 }º ponto: ${hora}:${minutos}`)
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
  let url = `https://app.pontomaisweb.com.br/#/meu_ponto/registro_de_ponto`;
  let currentUrl = page.url();
  if (currentUrl !== url){
    await page.goto(url);
    await sleep(30000);
  }
  
  const pontoButton = (await page.$x("//button[.//text() = 'Registrar ponto']"))[0];
  await pontoButton.click();
  // await sleep(8000); // Aguardar para confirmar a mensagem de registro
  // const okButton = (await page.$x("//button[.//text() = 'OK']"))[0];
  // await okButton.click();
  return page;

};


module.exports = { StartAuto, ChecarTime };