import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_TICKETS_START = 'FETCH_TICKETS_START';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';

export const fetchTickets = () => dispatch => {
    dispatch({ type: FETCH_TICKETS_START });
    axiosWithAuth().get('/tickets')
        .then(res => dispatch({ type: FETCH_TICKETS_SUCCESS, payload: res.data }))
        .catch(err => console.log(err))
}

export const FETCH_SINGLE_TICKET_START = 'FETCH_SINGLE_TICKET_START';
export const FETCH_SINGLE_TICKET_SUCCESS = 'FETCH_SINGLE_TICKET_SUCCESS';

export const fetchSingleTicket = (id) => dispatch => {
    dispatch({ type: FETCH_SINGLE_TICKET_START });
    axiosWithAuth().get(`/findById/${id}`)
        .then(res => dispatch({ type: FETCH_SINGLE_TICKET_SUCCESS, payload: res.data }))
        .catch(err => console.log(err))
}

export const POST_TICKET_START = 'POST_TICKET_START';
export const POST_TICKET_SUCCESS = 'POST_TICKET_SUCCESS';

export const postTicket = (ticket) => dispatch => {
    dispatch({ type: POST_TICKET_START });
    axiosWithAuth().post('/create', ticket)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const PUT_TICKET_START = 'PUT_TICKET_START';
export const PUT_TICKET_SUCCESS = 'PUT_TICKET_SUCCESS';

export const putTicket = (id, solution) => dispatch => {
    dispatch({ type: PUT_TICKET_START });
    axiosWithAuth().put(`answer/${id}`, { answer: solution })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const SET_USER_TYPE = 'SET_USER_TYPE'

export const setUserType = (userType) => {
    return {
        type: SET_USER_TYPE,
        payload: userType
    }
}