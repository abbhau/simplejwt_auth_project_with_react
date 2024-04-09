import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token')) ;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }else if (!token){
      window.location.href = 'http://localhost:3000/login/'
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it .
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        console.log("------", refreshToken)
        const response = await axios.post('http://127.0.0.1:8000/api/refresh-token/',
                                                    {'refresh': refreshToken } );
        const token  = response.data.access;

        localStorage.setItem('token', JSON.stringify(token));

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        alert('Session get Expired plz login again .....')
        window.location.href = 'http://localhost:3000/login/'
      }
    }

    return Promise.reject(error);
  }
);

export default api
