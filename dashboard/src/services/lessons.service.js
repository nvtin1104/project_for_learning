import sendRequest from 'src/utils/resquest';

const LessonsService = {
  getAll: ({ page, limit }) => sendRequest('get', `lessons?page=${page}&limit=${limit}`),
  create: (data) => sendRequest('post', 'lessons', data),
  delete: (id) => sendRequest('delete', `lessons/${id}`),
  get: (id) => sendRequest('get', `lessons/${id}`),
  update: (id, data) => sendRequest('patch', `lessons/${id}`, data),
};

export default LessonsService;
