import axios from "axios";

// உங்க backend Render URL
const API = axios.create({
  baseURL: "https://ott-backend-imh7.onrender.com/api",
});

export const getMovies = () => API.get("/movies");
export const addMovie = (movieData) => API.post("/movies", movieData);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

export default API;
