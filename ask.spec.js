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
      json: jest.fn(() => ['url 1', 'url 2']),
    });

    const response = await ask('test/fetch/url', {
      method: 'get',
      headers: {
        id: '',
      },
      responseType: 'json',
    });

    expect(response).toEqual(['url 1', 'url 2']);
  });

  test('returns text results', async () => {
    fetch.mockResolvedValue({
      ok: true,
      text: jest.fn(() => ['url 1', 'url 2']),
    });

    const response = await ask('test/fetch/url', {
      method: 'get',
      headers: {
        id: '',
      },
      responseType: 'text',
    });

    expect(response).toEqual(['url 1', 'url 2']);
  });

  test('returns raw results', async () => {
    fetch.mockResolvedValue({
      ok: true,
      body: ['url 1', 'url 2'],
    });

    const response = await ask('test/fetch/url', {
      method: 'get',
      headers: {
        id: '',
      },
      responseType: 'raw',
    });

    expect(response).toEqual({ ok: true, body: ['url 1', 'url 2'] });
  });

  test('works without a config object', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn(() => ['url 1', 'url 2']), // treats response as json by default
    });

    const response = await ask('test/fetch/url');

    expect(response).toEqual(['url 1', 'url 2']);
  });

  test('response not ok throws error', async () => {
    fetch.mockResolvedValue({
      ok: false,
      statusText: 'Error thrown',
      statusCode: 500,
      json: jest.fn(() => ['url 1', 'url 2']),
    });

    try {
      await ask('test/fetch/url', {
        method: 'get',
        headers: {
          id: '',
        },
        responseType: 'json',
      });
    } catch (err) {
      // eslint-disable-next-line jest/no-try-expect
      expect(err).toBeDefined();
      // eslint-disable-next-line jest/no-try-expect
      expect(err.message).toEqual('Error thrown');
      // eslint-disable-next-line jest/no-try-expect
      expect(err.statusCode).toEqual(500);
    }
  });

  describe('object body', () => {
    beforeEach(() => {
      fetch.mockResolvedValue({ ok: true, json: jest.fn() });
    });

    test('stringifies the object body', async () => {
      const body = { stringify: 'me' };
      await ask('test/fetch/url', {
        method: 'get',
        responseType: 'json',
        body,
      });

      expect(fetch).toHaveBeenCalledWith(
        'test/fetch/url',
        expect.objectContaining({
          body: JSON.stringify(body),
        })
      );
    });

    test('does nothing if body is a string', async () => {
      await ask('test/fetch/url', {
        method: 'get',
        responseType: 'json',
        body: '{}',
        headers: {
          'X-Sent-From': 'jest',
        },
      });

      expect(fetch).toHaveBeenCalledWith('test/fetch/url', {
        body: '{}',
        headers: {
          'X-Sent-From': 'jest',
        },
        method: 'get',
      });
    });
  });
});
