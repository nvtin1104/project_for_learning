import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then((res) => res.data);
}

const AuthService = {
  login: (data) => handleRequest('post', 'auth/login', data),
  register: (data) => handleRequest('post', 'users', data),
  getCurrent: () => handleRequest('get', 'users/current'),
  getOTP: (data) => handleRequest('post', 'auth/getOTP', data),
  resetPassword: (data) => handleRequest('post', 'users/reset-password', data),
  loginWithGG: (data) => handleRequest('post', 'auth/loginWithGG', data)
};

export default AuthService;
