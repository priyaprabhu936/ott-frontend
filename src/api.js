import axios from "axios";

// Your backend URL
const API = axios.create({
  baseURL: "https://ott-backend-imh7.onrender.com/api",
});

// Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (payload) => API.post("/auth/register", payload);
export const login = (payload) => API.post("/auth/login", payload);

// Movies
export const getMovies = () => API.get("/movies");
export const addMovie = (movieData) => API.post("/movies", movieData);
export const updateMovie = (id, movieData) => API.put(`/movies/${id}`, movieData);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

export default API;
