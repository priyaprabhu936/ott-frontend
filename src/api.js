import axios from "axios";

// Backend URL
const API = axios.create({
  baseURL: "https://ott-backend-imh7.onrender.com/api",
});

// 🔐 If token exists, attach automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getMovies = () => API.get("/movies");
export const addMovie = (movieData) => API.post("/movies", movieData);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (userData) => API.post("/login", userData);

export default API;
