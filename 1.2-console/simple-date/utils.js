const {CURRENT, ADD, SUB,YEAR_SHORT, YEAR_LONG, MONTH_SHORT, MONTH_LONG, DAY_SHORT, DAY_LONG} = require('./constants')

const isNumber = (n) => !isNaN(parseFloat(n)) && !isNaN(n - 0);
const getValue = (abs, isSub) => isSub ? -1 * Number(abs) : Number(abs);
const validateIndexedKeys = (key) =>
    [CURRENT, ADD, SUB]
        .includes(key) 
const validateNamedKeys = (key) =>
    [YEAR_SHORT, YEAR_LONG, MONTH_SHORT, MONTH_LONG, DAY_SHORT, DAY_LONG]
        .includes(key)

const validate = (indexedKeys, namedKeys) => {12
    if(indexedKeys && indexedKeys.length && !indexedKeys.some(validateIndexedKeys)) {
        return false;
    }

    const namedKeyNames = Object.keys(namedKeys).filter((key) => !key.startsWith('$'));

    if(namedKeyNames && namedKeyNames.length && !namedKeyNames.some(validateNamedKeys)) {
        return false;
    }

    return true;
}

const reportError = () => console.log(`
Wrong arguments!\n
Type "current" to show current date.
Type "add" or "sub" to add or subtracrt from current date\n
With this options use "-d" or "--day" for day settings, "-m" or "--month" for month settings
and "-y" or "year" for year settings.
`
);

const onError = () => {
    reportError();
    process.exit(1)
}

module.exports = {
    isNumber,
    getValue,
    validate,
    onError
}