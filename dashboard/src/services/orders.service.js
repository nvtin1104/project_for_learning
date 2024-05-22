import sendRequest from "src/utils/resquest";

const OrdersService = {
  create: (data) => sendRequest('post', 'orders', data),
  getAll: (userId) => sendRequest('get', `orders/user/${userId}`),
  getAllForAdmin: () => sendRequest('get', 'orders'),
  delete: (id) => sendRequest('delete', `cart/${id}`),
  update: (id, data) => sendRequest('put', `orders/${id}`, data),
  dashboard: () => sendRequest('get', 'dashboard'),
};

export default OrdersService;