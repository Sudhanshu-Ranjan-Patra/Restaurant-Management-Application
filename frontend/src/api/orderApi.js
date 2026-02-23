import API from "./axios";

// Place a new order
// Backend expects `cart` items with price so it can calculate total
export const placeOrder = (cart) =>
  API.post("/food/placeorder", { cart });

// Get all orders (admin only)
export const getAllOrders = () => API.get("/food/all-orders");

// Update order status (admin only)
export const updateOrderStatus = (id, status) =>
  API.post(`/food/orderStatus/${id}`, { status });
