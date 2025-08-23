import axios from "axios";

const API = axios.create({
  baseURL: "https://ott-backend-imh7.onrender.com/api",  // un backend URL
});

export const getMovies = () => API.get("/movies");
export const addMovie = (movieData) => API.post("/movies", movieData);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

export default API;
