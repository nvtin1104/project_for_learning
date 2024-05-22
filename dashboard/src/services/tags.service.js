import sendRequest from "src/utils/resquest";


const TagsService = {
    getAll: () => sendRequest('get', 'tags'),
    create: (data) => sendRequest('post', 'tags', data),
    update: (id, data) => sendRequest('patch', `tags/${id}`, data),
    delete: (id) => sendRequest('delete', `tags/${id}`),
}
export default TagsService;