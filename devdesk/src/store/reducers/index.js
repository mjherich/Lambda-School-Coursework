import {
    FETCH_TICKETS_START, FETCH_TICKETS_SUCCESS,
    PUT_TICKET_START, POST_TICKET_START, POST_TICKET_SUCCESS,
    PUT_TICKET_SUCCESS, FETCH_SINGLE_TICKET_START,
    FETCH_SINGLE_TICKET_SUCCESS, SET_USER_TYPE
} from '../actions'

const initialState = {
    userType: '',
    user: '',
    ticketArray: [],
    singleTicket: {},
    isGetting: false,
    isPosting: false,
    isPutting: false,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_TYPE:
            return {
                ...state,
                userType: action.payload
            };
        case FETCH_TICKETS_START:
            return {
                ...state,
                isGetting: true,
                getError: '',
            };
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                isGetting: false,
                ticketArray: action.payload,
                user: '',
            };
        case FETCH_SINGLE_TICKET_START:
            return {
                ...state,
                isGetting: true,
                getError: '',
            };
        case FETCH_SINGLE_TICKET_SUCCESS:
            return {
                ...state,
                isGetting: false,
                singleTicket: action.payload,
            };
        case POST_TICKET_START:
            return {
                ...state,
                isPosting: true,
                postError: '',
            };
        case POST_TICKET_SUCCESS:
            return {
                ...state,
                isPosting: false,
                ticketArray: '',
            };
        case PUT_TICKET_START:
            return {
                ...state,
                isPutting: true,
                putError: '',
            };
        case PUT_TICKET_SUCCESS:
            return {
                ...state,
                isPutting: false,
                ticketArray: '',
            };
        default:
            return state
    }
}