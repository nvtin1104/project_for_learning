import sendRequest from 'src/utils/resquest';

const UsersService = {
  createUser: (data) => sendRequest('post', 'users', data),
  getAll: () => sendRequest('get', 'users'),
  getMe: () => sendRequest('get', 'users/current'),
  update: (id, data) => sendRequest('patch', `users/${id}`, data),
  getUserById: (id) => sendRequest('get', `users/${id}`),
  updatePassword: (id, data) => sendRequest('patch', `users/password/${id}`, data),
  delete: (id) => sendRequest('delete', `users/${id}`),
};

export default UsersService;
