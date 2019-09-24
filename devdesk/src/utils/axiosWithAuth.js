import axios from 'axios'

const axiosWithAuth = () => {
    return axios.create({
        baseURL: '',
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
}

export default axiosWithAuth;