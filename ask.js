const fetch = require('node-fetch');

module.exports = async function ask(url, config) {
  const defaults = {
    responseType: 'json',
    method: 'get',
  };
  const { responseType, ...init } = { ...defaults, ...config };
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
