import API from "./axios";

export const getAllFoods = () => API.get("/food/getAll");

export const createFood = (data) =>
  API.post("/food/create", data);

export const updateFood = (id, data) =>
  API.put(`/food/update/${id}`, data);

export const deleteFood = (id) =>
  API.delete(`/food/delete/${id}`);
