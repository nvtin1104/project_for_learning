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
  createUser: (data) => handleRequest('post', 'users', data),
  getAll: () => handleRequest('get', 'users'),
  getMe: () => handleRequest('get', 'users/current'),
  update: (id, data) => handleRequest('patch', `users/${id}`, data),
  getUserById: (id) => handleRequest('get', `users/${id}`),
  updatePassword: (id, data) => handleRequest('patch', `users/password/${id}`, data),
  delete: (id) => handleRequest('delete', `users/${id}`)
};

export default UsersService;
