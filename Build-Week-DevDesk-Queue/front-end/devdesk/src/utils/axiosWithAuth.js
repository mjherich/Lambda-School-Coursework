import axios from 'axios'

const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'https://lambda-dev-desk-queue.herokuapp.com/tickets',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export default axiosWithAuth;