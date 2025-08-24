import axios from "axios";

// Backend base URL
const API = axios.create({
  baseURL: "https://ott-backend-imh7.onrender.com/api",
});

// Movies
export const getMovies = () => API.get("/movies");
export const addMovie = (movieData) => API.post("/movies", movieData);
export const updateMovie = (id, movieData) => API.put(`/movies/${id}`, movieData);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

export default API;
