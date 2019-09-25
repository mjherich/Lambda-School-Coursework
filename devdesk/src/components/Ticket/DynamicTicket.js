import React, { useState, useEffect } from 'react';

const DynamicTicket = (props) => {
    const [ticket, setTicket] = useState({});
    const id = props.match.params.id;

    useEffect(() => {
        //axios get individual ticket
    }, [])

    return (
        <div>
            <h3>{ticket.title}</h3>
            <p>Status: {ticket.closed}</p>
            <p>{ticket.category}</p>
            <p>{ticket.description}</p>
            {ticket.answer ? <p>{ticket.answer}</p> : null}
        </div>
    )
}

export default DynamicTicket;