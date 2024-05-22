import sendRequest from "src/utils/resquest";

const ProductsSerice = {
  getAll: () => sendRequest('get', 'products'),
  create: (data) => sendRequest('post', 'products', data),
  delete: (id) => sendRequest('delete', `products/${id}`),
  get: (id) => sendRequest('get', `products/${id}`),
  update: (id, data) => sendRequest('put', `products/${id}`, data),
};

export default ProductsSerice;