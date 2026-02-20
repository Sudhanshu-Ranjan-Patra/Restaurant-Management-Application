import API from "./axios";

export const getAllResturants = () => API.get("/resturant/getAll");
