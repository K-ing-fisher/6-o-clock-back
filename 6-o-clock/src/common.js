import toastr from 'toastr'

export const VALIDATION_CHECK = {
  INVALIDATION_PASSWORD: 'INVALIDATION_PASSWORD',
  DIFFERENT_PASSWORD: 'DIFFERENT_PASSWORD',
  EMPTY_NAME: 'EMPTY_NAME',
  EMPTY_ID: 'EMPTY_ID',
  SUCCESS: 'SUCCESS'
}

export const errorHandler = function (error) {
  if (error) {
    toastr.error(`Error ${error.response.status} - ${error.response.statusText}`);
  }
}

export const setToken = function (token) {
  localStorage.setItem('access_token', token);
}

export const getToken = function () {
  return localStorage.getItem('access_token');
}