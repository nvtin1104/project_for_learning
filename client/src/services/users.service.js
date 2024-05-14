import request from '../utils/request';

async function handleRequest(method, url, data) {
  try {
    const res = await request[method](url, data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const UsersService = {
  getAll: () => handleRequest('get', 'users'),
  getByID: (id) => handleRequest('get', `users/${id}`),
  delete: (id) => handleRequest('delete', `users/${id}`),
  add: (data) => handleRequest('post', 'users', data),
  create: (data) => handleRequest('post', 'users', data),
  update: (id, data) => handleRequest('put', `users/${id}`, data),
  addCoin: (id, data) => handleRequest('patch', `users/coin/${id}`, data),
};

export default UsersService;