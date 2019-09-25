import React from 'react'
import { Link } from 'react-router-dom'

import TicketCard from './TicketCard'
import ticketArray from '../../MockData';

const TicketList = () => {
    return (
        <div className='ticket-grid'>
            {ticketArray.map(ticket => <Link className='ticket-link' to={`/ticket/${ticket.id}`} ><TicketCard key={ticket.id} ticket={ticket} /> </Link>)}
        </div>
    )
}

export default TicketList;