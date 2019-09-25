import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_TICKETS_START = 'FETCH_TICKETS_START';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAIL = 'FETCH_TICKETS_FAIL';

export const fetchTickets = () => dispatch => {
    dispatch({ type: FETCH_TICKETS_START });
    axiosWithAuth().get()
        .then(res => console.log(res))
        .catch(err => console.log(err))
}