import axios from 'axios';

const api = axios.create({
  baseURL: "https://stockcontrol-production-b89b.up.railway.app/api"
});

export default api;
