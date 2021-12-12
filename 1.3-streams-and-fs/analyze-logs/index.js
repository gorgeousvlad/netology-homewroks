#!/usr/bin/env node

const fs = require('fs');
const {resolve} = require('path');
const {getPercentRatio, checkLoose, checkWin} = require('./utils');


const [,,fileName] = process.argv;

if(!fileName || !fs.existsSync(resolve(fileName))) {
    console.log('Не найден лог-файл')

    process.exit(1);
}


let winsCount = 0;
let looseCount = 0;

fs.createReadStream(fileName)
    .on("data", (chunk) => {
    const lines = (chunk.toString()||'').split('\n');

    for(const line of lines) {
        if(line && !line.startsWith('Session end')) {
            if (checkWin(line)) {
                winsCount++;
            } else if(checkLoose(line)) {
                looseCount++;
            }
        }
    }
   
    }).on("end", () => {
        const total = winsCount + looseCount;

        console.log(`Сыграно партий: ${total}\n`);
        console.log(`Количество выигранных партий: ${winsCount}\n`);
        console.log(`Количество проигранных партий: ${looseCount}\n`);
        console.log(`Процентное соотношение выигранных партий: ${getPercentRatio(total, winsCount)}\n`);
    }).on("error", (ex)=> {console.error('Произошла ошибка', ex)});
