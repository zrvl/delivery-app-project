import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://delivery-app-zhuravel.herokuapp.com/"
})