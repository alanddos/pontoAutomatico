'use strict';

const { start } = require('./start');

(async () => {
  try {
    await start();
    console.log('Done running');
  } catch (err) {
    console.error(err);
  }
})();
