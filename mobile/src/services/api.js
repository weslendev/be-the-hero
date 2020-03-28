import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.12:3333', //Aqui no react, usar o ip da rede
});

export default api;