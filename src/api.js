import axios from "axios";

// backend base URL (Render)
const API = axios.create({
  baseURL: "https://ott-backend-imh7.onrender.com/api",
});

// attach JWT if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// auth
export const register = (payload) => API.post("/auth/register", payload);
export const login = (payload) => API.post("/auth/login", payload);

// movies
export const getMovies = () => API.get("/movies");
export const addMovie = (movieData) => API.post("/movies", movieData);
export const updateMovie = (id, movieData) => API.put(`/movies/${id}`, movieData);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

export default API;
