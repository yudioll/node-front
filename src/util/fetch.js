import axios from 'axios'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 50000
})

service.interceptors.request.use((config) => {
    console.log(config)
    return config
})

service.interceptors.response.use(res => {
    console.log(res)
}, err => {
    console.log(err)
})

export default service