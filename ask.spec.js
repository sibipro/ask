const fetch = require('node-fetch');

const ask = require('./ask');

jest.mock('node-fetch');

describe('fetch request', () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test('it exports a function', () => {
    expect(typeof ask).toBe('function');
  });

  test('returns json results', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn(() => ['url 1', 'url 2'])
    });

    const response = await ask('test/fetch/url', {
      method: 'get',
      headers: {
        id: ''
      },
      responseType: 'json'
    });

    expect(response).toEqual(['url 1', 'url 2']);
  });

  test('returns text results', async () => {
    fetch.mockResolvedValue({
      ok: true,
      text: jest.fn(() => ['url 1', 'url 2'])
    });

    const response = await ask('test/fetch/url', {
      method: 'get',
      headers: {
        id: ''
      },
      responseType: 'text'
    });

    expect(response).toEqual(['url 1', 'url 2']);
  });

  test('returns raw results', async () => {
    fetch.mockResolvedValue({
      ok: true,
      body: ['url 1', 'url 2']
    });

    const response = await ask('test/fetch/url', {
      method: 'get',
      headers: {
        id: ''
      },
      responseType: 'raw'
    });

    expect(response).toEqual({ ok: true, body: ['url 1', 'url 2'] });
  });

  test('response not ok throws error', async () => {
    fetch.mockResolvedValue({
      ok: false,
      statusText: 'Error thrown',
      statusCode: 500,
      json: jest.fn(() => ['url 1', 'url 2'])
    });
    try {
      return await ask('test/fetch/url', {
        method: 'get',
        headers: {
          id: ''
        },
        responseType: 'json'
      });
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toEqual('Error thrown');
      expect(err.statusCode).toEqual(500);
    }
  });
});
