import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then((res) => res.data);
}

const AuthService = {
  getUserGit: (code) =>
    handleRequest('get', `/account/getTokenUser?code=${code}`),
  handleGetUser: () => handleRequest('get', '/account/getUser'),
  addUserGg: (data) => handleRequest('post', '/account/addUserGg', data),
};

export default AuthService;
