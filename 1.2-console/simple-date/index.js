#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const {isNumber, getValue, validate, onError} = require('./utils');
const {CURRENT, ADD, SUB,YEAR_SHORT, YEAR_LONG, MONTH_SHORT, MONTH_LONG, DAY_SHORT, DAY_LONG} = require('./constants')

const {_: indexedArgs, ...namedArgs} = argv;

const year = namedArgs[YEAR_SHORT] ||  namedArgs[YEAR_LONG];
const month = namedArgs[MONTH_SHORT] ||  namedArgs[MONTH_LONG];
const day = namedArgs[DAY_SHORT] ||  namedArgs[DAY_LONG];

const isCurrent = indexedArgs.includes(CURRENT);
const isAdd = indexedArgs.includes(ADD);
const isSub = indexedArgs.includes(SUB);


if(!validate(indexedArgs, namedArgs)){
  onError();
}

const date = new Date();

if (isCurrent) {
    if(year) {
        console.log(date.getFullYear());
    } else if(month) {
        console.log(date.getMonth());
    } else if(day) {
        console.log(date.getDate());
    } else {
        console.log(date.toISOString());
    }
} else if (isAdd || isSub) {
    if(year && isNumber(year)) {
        const curYear = date.getFullYear();
        const value = getValue(year, isSub);

        date.setFullYear(curYear + value);
    } else if(month && isNumber(month)) {
        const curMonth = date.getMonth();
        const value = getValue(month, isSub);

        date.setMonth(curMonth + value);
    } else if(day && isNumber(day)) {
        const curDay = date.getDate();
        const value = getValue(day, isSub);

        date.setDate(curDay + value)
    } else {
        onError();
    }

    console.log(date.toISOString())
} else {
    onError();
}
