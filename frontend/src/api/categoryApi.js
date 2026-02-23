import API from "./axios";

export const getAllCategories = () => API.get("/category/getAll");

export const createCategory = (data) => API.post("/category/create", data);

export const updateCategory = (id, data) =>
  API.put(`/category/update/${id}`, data);

export const deleteCategory = (id) =>
  API.delete(`/category/delete/${id}`);

