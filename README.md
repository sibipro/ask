# ASK

A simple wrapper for [node-fetch](https://www.npmjs.com/package/node-fetch)

[View on NPM](https://www.npmjs.com/package/@tech_sibi/ask)

## Usage

Add it to your repo.

```
$ npm add @tech_sibi/ask
```

Require ask at the top of you node.js file.

```
const ask = require('@tech_sibi/ask');
```

Making a GET request.

```
async function makeRequest() {
    return await ask("http://google.com");
}
```

Making a POST request.

```
async function makeRequest(headers) {
    return await ask("http://google.com", { method: "POST", headers, responseType: "json" });
}
```
