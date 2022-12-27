import axios from 'axios';

export const FETCHING_QR_CODE_START = 'FETCHING_QR_CODE_START'
export const FETCHING_QR_CODE_SUCCESS = 'FETCHING_QR_CODE_SUCCESS'
export const FETCHING_QR_CODE_FAILURE = 'FETCHING_QR_CODE_FAILURE'

// Get QR code action creator. `values` is an object containing a `qrString` property which is what we want to use
export const createQrCode = values => {
  return dispatch => {
    console.log('string to fetch qr code with: ', values.qrString)
    const encodedStr =  encodeURI(values.qrString)
    dispatch({ type: 'FETCHING_QR_CODE_START' })
    axios.get(`https://api.qrserver.com/v1/create-qr-code/?data=${encodedStr}`)
    .then(res => {
      dispatch({
        type: FETCHING_QR_CODE_SUCCESS,
        payload: {
          string: values.qrString,
          image: res.data
        }
      });
    })
    .catch(err => console.log(err))
  }
}