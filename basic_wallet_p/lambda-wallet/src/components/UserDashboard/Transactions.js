import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';

import AppContext from '../../state/AppContext';
import StickyHeadTable from './StickyHeadTable';


export default function Transactions() {
  const ctx = useContext(AppContext);
  
  const createRows = userTransactions => {
    let rows = [];
    userTransactions.forEach(block => {
      let id = block.block_id;
      block.blockTransactions.forEach(t => {
        rows.push({
          block: id,
          sender: t.sender,
          recipient: t.recipient,
          amount: t.amount
        })
      })
    })
    return rows;
  }

  return (
    <div className="user-transactions">
      <Typography variant="h3">Your Transactions</Typography>
      {ctx.state.userTransactions.length > 0 ? (
        <StickyHeadTable rows={createRows(ctx.state.userTransactions)} />
      ) : (
        <p>Loading Transactions...</p>
      )}
    </div>
  )
}