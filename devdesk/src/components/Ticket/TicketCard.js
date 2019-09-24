import React from 'react'

const TicketCard = ({ ticket }) => {

    return (
        <div className='ticket-card'>
            <h3>{ticket.title}</h3>
            <p>Status: {ticket.closed ? 'Closed' : 'Open'}</p>
        </div>
    );
}

export default TicketCard;
