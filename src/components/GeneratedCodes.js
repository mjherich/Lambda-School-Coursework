import React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';

function GeneratedCodes(props) {
  return (
    <>
      <h2>Generated QR Codes</h2>
      {props.qrCodes.length===0 ? (
        <p>No Generated QR codes</p>
      ) : (
        <>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURI(props.qrCodes[0].qrString)}`} alt="generated qr code" />
          <p>{props.qrCodes[0].qrString}</p>
        </>
      )}
      <Divider horizontal>Previously Generated Codes</Divider>
      {props.qrCodes.length>1 && props.qrCodes.map((qrCode, idx) => {
        const encodedStr =  encodeURI(qrCode.qrString)
        return (
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedStr}`} alt="generated qr code" />
        )
      })}
    </>
  )
}

const mapStateToProps = state => {
  return {
    qrCodes: state.qrCodes,
    isLoading: state.isLoading
  }
}
export default connect(
  mapStateToProps,
  {}
)(GeneratedCodes)