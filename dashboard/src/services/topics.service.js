import sendRequest from 'src/utils/resquest';

const TopicsService = {
  getAll: () => sendRequest('get', 'topics'),
  create: (data) => sendRequest('post', 'topics', data),
  update: (id, data) => sendRequest('patch', `topics/${id}`, data),
  delete: (id) => sendRequest('delete', `topics/${id}`),
  getById: (id) => sendRequest('get', `topics/${id}`),
};
export default TopicsService;
