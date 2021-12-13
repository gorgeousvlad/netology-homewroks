#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const {resolve} = require('path');

const {getGuessedValue} = require('./utils');
const {VALUES, LOG_FILE, END_MARKER} = require('./constants');

const [,,fileName] = process.argv;

if(!fileName) {
    console.warn('Не задан файл для логирования результатов')
}

const logFile = resolve(fileName || LOG_FILE)
const logStream = fs.createWriteStream(logFile, {flags: 'a'});
const input = readline.createInterface(process.stdin);
let guessedValue;


function play() {
    guessedValue = getGuessedValue();
    console.log(`Орел(2) или Решка(1)? (${END_MARKER}) для завершения`);
}

function logResult(isGuessed) {
    const log = `Result: ${isGuessed ? `win`:`loose`} Date: ${String(new Date())}\n`

    logStream.write(log);
}

play();

input.on('line', (data) => {
    if (data === END_MARKER) {
        input.close();

        return;
    }

    const inputNumber = Number(data);

    if(isNaN(inputNumber)) {
        console.log('Неверный формат числа\n');

        return;
    }

    if(!VALUES.includes(Number(inputNumber))) {
        console.log('Введенное число не попадает в диапазон значений\n');

        return;
    }

    if (inputNumber === guessedValue) {
        console.log(`Верно!\n`);
        logResult(true);
    } else {
        console.log(`Не угадали!\n`);
        logResult(false);
    }

    play();
});

input.on('close', () => {
    console.log('Завершение');
    logStream.end(`\nSession end Date: ${String(new Date())}\n`);

});