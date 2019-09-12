import axios from 'axios'

const api = axios.create({
    baseURL: 'http://spacious-mistrial.000webhostapp.com/',
  });
  
  export default api;