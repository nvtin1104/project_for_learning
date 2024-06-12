import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then((res) => res.data);
}

const HistoryService = {
  createTest: ({ data }) => handleRequest('post', '/history-test', data),
  getTest: ({ id }) => handleRequest('get', `/history-test/${id}`)
};

export default HistoryService;
