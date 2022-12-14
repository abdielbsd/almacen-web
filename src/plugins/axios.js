//import Vue from 'vue'
import axios from 'axios'

//Vue.use(axios);


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
const axiosInstance = axios.create({
    timeout: 3600000,
    //baseURL: process.env.URL_BACK,
    baseURL: 'http://192.168.137.1:3000/api',
    headers
})

axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  

export {
    axiosInstance,
  }