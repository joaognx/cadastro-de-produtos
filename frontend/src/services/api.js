import axios from 'axios'

const api = axios.create({
    baseURL: 'https://backend-produtos-ab7x.onrender.com/'
})

export default api