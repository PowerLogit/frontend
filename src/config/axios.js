import axios from 'axios'
import { API_BACKEND } from './common'

const instance = axios.create({
    baseURL: `http://${API_BACKEND}/api/`,
    responseType: 'json',
})

export default instance
