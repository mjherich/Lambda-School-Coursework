import React, { useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';

import AppContext from '../state/AppContext';

export default function UserDashboard() {
  const ctx = useContext(AppContext);

  useEffect(() => {
    axios
      .get('http://localhost:5000/chain')
      .then(res => {
        console.log(res)
        ctx.setState({
          ...ctx.state,
          chain: res.data.chain
        })
      })
      .catch(err => console.log(err))
  }, [])

  const calculateBalance = id => {
    for (let block in ctx.state.chain) {
      console.log(block)
    }
  }

  return (
    <Box>
      <p>Logged in as {ctx.state.id}</p><br/>
      <div className="balance">
        {ctx.state.chain ? (
          <p>Chain Data here</p>
        ) : (
          <p>Fetching Chain...</p>
        )}
      </div>
      <div className="transactions">
        
      </div>
    </Box>
  )
}