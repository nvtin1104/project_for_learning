import sendRequest from 'src/utils/resquest';

const UsersService = {
  getAll: () => sendRequest('get', 'users'),
  getMe: () => sendRequest('get', 'users/current'),
  update: (id, data) => sendRequest('patch', `users/${id}`, data),
  updatePassword: (id, data) => sendRequest('patch', `users/password/${id}`, data),
  delete: (id) => sendRequest('delete', `users/${id}`),
};

export default UsersService;
