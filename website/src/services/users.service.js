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
  update: (data) => handleRequest('patch', `users/current`, data),
  getUserById: (id) => handleRequest('get', `users/${id}`),
  updatePassword: (data) => handleRequest('patch', `users/change-password`, data),
  delete: (id) => handleRequest('delete', `users/${id}`)
};

export default UsersService;
