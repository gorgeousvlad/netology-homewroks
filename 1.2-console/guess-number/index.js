#!/usr/bin/env node

const readline = require('readline');

const {RANGE} = require('./constants');
const {randomInteger, printGameStart} = require('./utils');

const input = readline.createInterface(process.stdin);
let number = randomInteger(...RANGE);

printGameStart();

input.on('line', (data) => {
    const inputNumber = Number(data);

    if(isNaN(inputNumber)) {
        console.log('Неверный формат числа\n');

        return;
    }

    if(inputNumber < RANGE[0] || inputNumber > RANGE[1]) {
        console.log('Введенное число не попадает в диапазон значений\n');

        return;
    }

    if (inputNumber === number) {
        console.log(`Отгадано число ${number}\n`);
        number = randomInteger(...RANGE);
        printGameStart();
    } else {
        console.log(`${inputNumber > number ? 'Больше':'Меньше'}\n`);
    }
});

input.on('close', () => console.log('Завершение'))