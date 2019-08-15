import React from 'react';
import { Divider } from 'semantic-ui-react';

export default function GeneratedCodes() {
  return (
    <>
      <h2>Generated Code goes here</h2>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" alt="generated qr code" />
      <Divider horizontal>Previously Generated Codes</Divider>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" alt="generated qr code" />
    </>
  )
}