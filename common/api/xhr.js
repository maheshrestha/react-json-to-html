import axios from 'axios';
import type { $AxiosXHRConfigBase, AxiosPromise } from 'axios';
import merge from 'lodash-es/merge';

let csrfToken;

function getCSRFToken(): string {
  if (csrfToken) {
    return csrfToken;
  }

  const meta = document.querySelector('meta[name="csrf-token"]');
  if (!(meta instanceof HTMLMetaElement)) {
    throw new Error('Unable to find CSRF token meta');
  }

  csrfToken = meta.getAttribute('content');
  if (typeof csrfToken !== 'string') {
    throw new Error('Unable to get CSRF token value');
  }
  return csrfToken;
}

function getDefaultRequestHeaders() {
  return {
    'X-Requested-With': 'XMLHttpRequest',
    //'X-CSRF-Token': getCSRFToken()
  };
}

function setDefaultRequestOptions(config: { headers?: Object } = {}) {
  return merge(
    {},
    {
      headers: getDefaultRequestHeaders()
    },
    config
  );
}

function setJSONHeaders(config: { acce?: Object } = {}) {
  return merge(
    {},
    {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    config
  );
}

export function get<T>(
  url: string,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.get(url, setDefaultRequestOptions(config));
}

export function getJSON<T>(
  url: string,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios
    .get(url, setJSONHeaders(setDefaultRequestOptions(config)))
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error.response;
    });
}

export function post<T>(
  url: string,
  data: Object,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.post(url, data, setDefaultRequestOptions(config));
}

export function postJSON<T>(
  url: string,
  data: Object,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.post(
    url,
    data,
    setJSONHeaders(setDefaultRequestOptions(config))
  );
}

export function put<T>(
  url: string,
  data: Object,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.put(url, data, setDefaultRequestOptions(config));
}

export function putJSON<T>(
  url: string,
  data: Object,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.put(url, data, setJSONHeaders(setDefaultRequestOptions(config)));
}

export function patch<T>(
  url: string,
  data: Object,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.patch(url, data, setDefaultRequestOptions(config));
}

export function patchJSON<T>(
  url: string,
  data: Object,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.patch(
    url,
    data,
    setJSONHeaders(setDefaultRequestOptions(config))
  );
}

// delete is a reserved keyword, so we can”s use it as named export :(
export function deleteRequest<T>(
  url: string,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.delete(url, setDefaultRequestOptions(config));
}

export function deleteRequestJSON<T>(
  url: string,
  config?: $AxiosXHRConfigBase<T> = {}
): AxiosPromise<T> {
  return axios.delete(url, setJSONHeaders(setDefaultRequestOptions(config)));
}
