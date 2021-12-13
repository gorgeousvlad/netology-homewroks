const http = require('http');
const {getActionUrl} = require('./utils');
const {Actions} = require('./constants');

const [,,query] = process.argv;

if(!query) {
    console.log('Forecast city not specified');

    return;
}
const url = getActionUrl(Actions.Current, {query});

http.get(url,(res) => {
    res.setEncoding('utf8');
    let rawData = '';

    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        let {current} = JSON.parse(rawData) || {};

        if(!current) {
            console.log('Data loading error');

            return;
        }

        console.log([
            `Forecast for ${query}:`,
            `Temperature: ${current.temperature}`,
            `Wind Speed: ${current.wind_speed}`,
            `Wind Degree: ${current.wind_degree}`,
            `Wind Dir: ${current.wind_dir}`,
            `Pressure: ${current.pressure}`
        ].join('\n'));
    })
}).on('error', (e) => {console.error(`Unecxepted error: ${e.message}`);})

