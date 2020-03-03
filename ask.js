const fetch = require('node-fetch');

const defaults = {
  responseType: 'json',
  method: 'get',
};

const isObject = v => typeof v === 'object' && !Array.isArray(v) && v !== null;

const encodeBody = config => {
  if (!isObject(config.body)) return config;

  // if body is an object, stringify it
  const newConfig = { ...config, body: JSON.stringify(config.body) };

  // set content-type header if not already set
  if (!config.headers) {
    return {
      ...newConfig,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  const keys = Object.keys(config.headers);
  const contentType = keys.find(key => key.toLowerCase() === 'content-type');

  // content-type header exists, don't modify it
  if (contentType) return newConfig;

  return { ...newConfig, headers: { ...config.headers, 'Content-Type': 'application/json' } };
};

module.exports = async function ask(url, config) {
  const { responseType, ...init } = { ...defaults, ...encodeBody(config) };
  const response = await fetch(url, init);

  if (!response.ok) {
    const err = new Error(response.statusText);
    err.statusCode = response.statusCode;
    throw err;
  }

  if (responseType === 'json') return response.json();
  if (responseType === 'text') return response.text();

  return response;
};
