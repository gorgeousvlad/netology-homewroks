const {RANGE} = require('./constants');

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printGameStart() {
  console.log(`Загадано число в диапазоне от ${RANGE[0]} до ${RANGE[1]}\n`);
}

module.exports = {
  randomInteger,
  printGameStart
}