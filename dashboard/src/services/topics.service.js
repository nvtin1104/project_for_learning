import sendRequest from 'src/utils/resquest';

const TopicsService = {
  getAll: () => sendRequest('get', 'topics'),
  create: (data) => sendRequest('post', 'topics', data),
  update: (id, data) => sendRequest('patch', `topics/${id}`, data),
  delete: (id) => sendRequest('delete', `topics/${id}`),
};
export default TopicsService;
