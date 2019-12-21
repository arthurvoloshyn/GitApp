// @flow
/**
 * Client
 * @module Client
 */

export class ServerError extends Error {
  response: Object;

  constructor(message?: string): Error {
    super(message);

    Error.captureStackTrace(this, ServerError);

    this.name = 'ServerError';

    return this;
  }
}

export const parseError = (error: string): string => error || 'Something went wrong';

/**
 * Fetch data
 *
 * @param {string} url
 * @param {Object} options
 * @param {string} [options.method] - Request method ( GET, POST, PUT, ... ).
 * @param {string} [options.payload] - Request body.
 * @param {Object} [options.headers]
 *
 * @returns {Promise}
 */
export const request = (url: string, options: Object = {}): Promise<*> => {
  const config = {
    method: 'GET',
    ...options,
  };
  const errors = [];

  if (!url) {
    errors.push('url');
  }

  const { payload, method, headers: configHeaders } = config;

  if (!payload && method !== 'GET' && method !== 'DELETE') {
    errors.push('payload');
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...configHeaders,
  };

  const params: Object = {
    headers,
    method,
  };

  const { method: paramsMethod } = params;

  if (paramsMethod !== 'GET') {
    params.body = JSON.stringify(payload);
  }

  return fetch(url, params).then(async response => {
    const { status, statusText, headers: responseHeaders } = response;
    const contentType = responseHeaders.get('content-type');

    if (status > 299) {
      const error: Object = new ServerError(statusText);
      error.status = status;

      if (contentType && contentType.includes('application/json')) {
        error.response = await response.json();
      } else {
        error.response = await response.text();
      }

      throw error;
    } else {
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }

      return response.text();
    }
  });
};
