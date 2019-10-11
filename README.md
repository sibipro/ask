# ASK

A simple wrapper for [node-fetch](https://www.npmjs.com/package/node-fetch)

[View on NPM](https://www.npmjs.com/package/@sibipro/ask)

## Usage

Add it to your repo.

```
$ yarn add @sibipro/ask
```

Require ask at the top of you node.js file.

```
const ask = require('@sibipro/ask');
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
