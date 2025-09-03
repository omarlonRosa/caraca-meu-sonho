import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@CaracaMeuSonho:token');

  if(token) {
    config.headers.Authorization = `Bearer ${token}`;

  }
  return config;
})

export const googleAuthUrl = 'http://localhost:8080/oauth2/authorization/google';


export default api;

