import axios from 'axios'

const api = axios.create({
    baseURL: 'http://spacious-mistrial.000webhostapp.com/phpjoao.php',
  });
  
  export default api;