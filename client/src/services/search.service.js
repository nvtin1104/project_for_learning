import request from '../utils/request';

async function handleRequest(method, url, data) {
    return request[method](url, data).then((res) => res.data);
}

const SearchService = {
    searchLessons: (search) =>  handleRequest('post', `/search/lessons`, search)
};

export default SearchService;
