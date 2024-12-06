import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:1806'


axios.interceptors.request.use((config) => {

  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})


axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          console.log('Unauthorized access')
          break
        case 403:
          // Forbidden
          console.log('Access forbidden')
          break
        case 500:
          // Server error
          console.log('Server error')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default axios