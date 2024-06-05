import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then((res) => res.data);
}

const AuthService = {
  login: (data) => handleRequest('post', 'auth/login', data),
  register: (data) => handleRequest('post', 'users', data),
  getOTP: (data) => handleRequest('post', 'auth/getOTP', data),
  changePassword: (data) => handleRequest('post', 'auth/changePassword', data),
  loginWithGG: (data) => handleRequest('post', 'auth/loginWithGG', data)
};

export default AuthService;
