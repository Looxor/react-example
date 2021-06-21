const apiRoot = 'will come from config';

async function parseJSON(response) {
  if (response.status === 204) {
    return undefined;
  }
  return response.json();
}

function checkStaus(response) {
  let error;
  if (response.status < 200 || response.status >= 300) {
    error = new Error(response.statusText);
  } else if (response.status !== 200) {
    error = new Error('Response is not JSON');
  }
  if (error) {
    error.response = response;
    throw error;
  }
  return response;
}

export default function request(url, option) {
  return fetch(url, option).then(checkStaus).then(parseJSON);
}

export function get(url, headers = {Authorization: {}}) {
  return request(`${apiRoot}${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: (headers && headers.Authorization) || undefined,
    },
  });
}

export function post(url, postData, headers) {
  return request(`${apiRoot}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: (headers && headers.Authorization) || undefined,
    },
    body: JSON.stringify(postData),
  });
}
