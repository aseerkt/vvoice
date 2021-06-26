import axios from 'axios';

export function logInRequest(data) {
  return axios.post('/users/login', data);
}

export function signUpRequest(data) {
  return axios.post('/users/signup', data);
}

export function getUserRequest() {
  return axios.get('/users/me');
}
