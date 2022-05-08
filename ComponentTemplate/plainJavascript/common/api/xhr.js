import axios from "axios";
import merge from "lodash-es/merge";

function getDefaultRequestHeaders() {
  return {
    "X-Requested-With": "XMLHttpRequest",
    //'X-CSRF-Token': getCSRFToken()
  };
}

function setDefaultRequestOptions(config = {}) {
  return merge(
    {},
    {
      headers: getDefaultRequestHeaders(),
    },
    config
  );
}

function setJSONHeaders(config = {}) {
  return merge(
    {},
    {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "yeH41GEyVq0HSoeXXCU5mEdnrO73NKvr",
    },
    config
  );
}

export function get(url, config = {}) {
  return axios.get(url, setDefaultRequestOptions(config));
}

export function getJSON(url, config = {}) {
  return axios
    .get(url, setJSONHeaders(setDefaultRequestOptions(config)))
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
}

export function post(url, data, config = {}) {
  return axios.post(url, data, setDefaultRequestOptions(config));
}

export function postJSON(url, data, config = {}) {
  return axios.post(
    url,
    data,
    setJSONHeaders(setDefaultRequestOptions(config))
  );
}

export function put(url, data, config = {}) {
  return axios.put(url, data, setDefaultRequestOptions(config));
}

export function putJSON(url, data, config = {}) {
  return axios.put(url, data, setJSONHeaders(setDefaultRequestOptions(config)));
}

export function patch(url, data, config = {}) {
  return axios.patch(url, data, setDefaultRequestOptions(config));
}

export function patchJSON(url, data, config = {}) {
  return axios.patch(
    url,
    data,
    setJSONHeaders(setDefaultRequestOptions(config))
  );
}

// delete is a reserved keyword, so we can”s use it as named export :(
export function deleteRequest(url, config = {}) {
  return axios.delete(url, setDefaultRequestOptions(config));
}

export function deleteRequestJSON(url, config = {}) {
  return axios.delete(url, setJSONHeaders(setDefaultRequestOptions(config)));
}
