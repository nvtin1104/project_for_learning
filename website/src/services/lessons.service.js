import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then((res) => res.data);
}

const LessonsService = {
  getAllActiveLessons: ({ limit, page, topicId }) => {
    if (topicId) {
      return handleRequest('get', `/lessons/all?limit=${limit}&page=${page}&topicId=${topicId}`);
    }
    return handleRequest('get', `/lessons/all?limit=${limit}&page=${page}`);
  },
  getLessonById: (id) => handleRequest('get', `/lessons/${id}`),
  getLessonsByUserId: () => handleRequest('get', '/lessons/user'),
  getAllTopic: () => handleRequest('get', '/topics'),
  create: (data) => handleRequest('post', '/lessons', data),
  delete: (id) => handleRequest('delete', `/lessons/${id}`)
};

export default LessonsService;
