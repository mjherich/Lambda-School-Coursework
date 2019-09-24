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
            <p>{ticket.category}</p>
            <p>{ticket.description}</p>
            <p>{ticket.answer}</p>
        </div>
    )
}

export default DynamicTicket;