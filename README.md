**Welvome to my repo! 🎉**

- Automation for `app.pontomaisweb.com.br`

## Setup

- First install [Node.js](https://nodejs.org/en/) 8 or newer.

- Run `npm i`

- Create .env like this :
```bash
PONTO_LOGIN_URL= https://app.pontomaisweb.com.br/#/acessar
PONTO_USERNAME= 021231561655
PONTO_PASSWORD= 23116513215
PONTO_REGISTRO_URL= https://app.pontomaisweb.com.br/#/meu_ponto/registro_de_ponto
# 0 = domingo 1 seg a 5 sex pode bater o ponto
PONTO_DIAS_SEMANA= [1, 2, 3, 4, 5] 
# horarios para bater o ponto
PONTO_HORARIOS= [08,12,13,18] 
PONTO_LATITUDE= -22.256466200833817
PONTO_LONGITUDE= -54.80682928776344
```

- Run `npm run start`

Made with ❤️