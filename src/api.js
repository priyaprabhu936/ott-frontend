import axios from "axios";

// Backend URL — இதை உங்க Render URL-ஆக மாற்றிக்கோங்க
// Example: https://ott-backend-imh7.onrender.com
const BASE_URL = "https://ott-backend-imh7.onrender.com";

const API = axios.create({
  baseURL: BASE_URL
});

export default API;

// NOTE:
// உங்கள் backend "/api/movies" என்றால், components-ல் endpoint-ஐ "/api/movies" என்று கொடுங்க.
// இந்த project இப்போ "/movies" பயன்படுத்துகிறது (உங்க current backend போல).
