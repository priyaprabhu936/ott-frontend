import axios from "axios";

// Render backend
const API = axios.create({
  baseURL: "https://ott-backend-imh7.onrender.com/api",
});

// Attach token for protected routes
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
export const addMovie = (movie) => API.post("/movies", movie);
export const updateMovie = (id, movie) => API.put(`/movies/${id}`, movie);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

export default API;
