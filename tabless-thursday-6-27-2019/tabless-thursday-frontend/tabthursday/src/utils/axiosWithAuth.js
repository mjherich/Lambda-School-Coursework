import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: 'https://tabless-thursday-be.herokuapp.com' //CHANGE BASE URL
  });
};

export default axiosWithAuth;
