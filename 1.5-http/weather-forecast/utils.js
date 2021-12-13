const {endpoint,token} = require('./config');
const ACCESS_KEY = process.env.ACCESS_KEY || token;

const getActionUrl = (action, params) => {
    const url = new URL(action, endpoint);
    params.access_key = ACCESS_KEY;
  
    Object.entries(params).map(([key, val]) => {
        url.searchParams.set(key, val);
    })

    return url;
}

module.exports = {
  getActionUrl
}