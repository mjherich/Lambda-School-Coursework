import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';

import AppContext from '../../state/AppContext';
import Transactions from './Transactions';

export default function UserDashboard() {
  const ctx = useContext(AppContext);
  
  const findUserTransactions = (chain, id) => {
    let userTransactions = [];
    for (let block of chain) {
      let blockTransactions = block.transactions.filter(t => t.recipient === id || t.sender === id);
      if (blockTransactions.length > 0) {
        userTransactions.push({block_id: block.index, blockTransactions});
      }
    }
    console.log(userTransactions);
    return userTransactions;
  }

  const calculateBalance = userTransactions => {
    let amount = 0;
    let id = ctx.state.id;
    userTransactions.forEach(block => {
      block.blockTransactions.forEach(t => {
        if (t.recipient === id) {
          amount += t.amount;
        } else {
          amount -= t.amount;
        }
      })
    })
    return amount;
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/chain')
      .then(res => {
        const transactions = findUserTransactions(res.data.chain, ctx.state.id);
        ctx.setState({
          ...ctx.state,
          chain: res.data.chain,
          userTransactions: transactions
        });
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <Box>
      <Typography variant="h4">Logged in as {ctx.state.id}</Typography><br/>
      <div>
        {ctx.state.chain ? (
          <div className="user-info">
            <Typography variant="h3">Your Balance: {calculateBalance(ctx.state.userTransactions)}</Typography>
            <Transactions />
          </div>
        ) : (
          <p>Fetching Chain...</p>
        )}
      </div>
    </Box>
  )
}