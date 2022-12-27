import { createQrCode,
  FETCHING_QR_CODE_START,
  FETCHING_QR_CODE_SUCCESS,
  FETCHING_QR_CODE_FAILURE
} from '../actions'

const initialState = {
  qrCodes: [
    // {
    //   qrString: "",
    //   qrImage: PNG_BASE64
    // }
  ],
  isLoadingQr: false,
}

export const qrReducer = ( state = initialState, action ) => {
  console.log('state in reducer', state)
  switch (action.type) {
    case FETCHING_QR_CODE_START:
      console.log('attempting to fetch qr code...')
      return {
        ...state,
        isLoadingQr: true
      }
      case FETCHING_QR_CODE_SUCCESS:
        console.log('successfully fetched qr code', action.payload)
        return {
          ...state,
          qrCodes: [
            ...state.qrCodes,
            {
              qrString: action.payload.string,
              qrImage: action.payload.image
            }
          ],
          isLoadingQr: false
       }
    case FETCHING_QR_CODE_FAILURE:
      console.log('error when fetching qr code', action.payload)
      return {
        ...state,
        isLoadingQr: false
       }
    default:
      return { ...state }
  }
}