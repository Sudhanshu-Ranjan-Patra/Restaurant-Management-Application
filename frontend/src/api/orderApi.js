import API from "./axios";

export const getAllOrders = () =>
  API.get("/order/all");

export const updateOrderStatus = (id, status) =>
  API.put(`/order/status/${id}`, { status });
