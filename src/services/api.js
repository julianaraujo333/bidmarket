import axios from 'axios';

const api = axios.create({
    baseURL: 'http://outsourcing.netgocio.pt/'
});


export default api;