import React, { useState } from 'react'

import ticketArray from '../../MockData'

const AnswerTicket = () => {
    const [answer, setAnswer] = useState('');

    const ticket = ticketArray[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        //axiosWithAuth put request here- change answer, helper id, and closed properties
        setAnswer('');
        //redirect to dashboard or individual ticket route to see updated ticket
    }
    return (
        <div className='form-div'>
            <h2>Answer Ticket Form</h2>
            <div>
                <h3>{ticket.title}</h3>
                <p>{ticket.category}</p>
                <p>{ticket.description}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Response:</label>
                <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Answer here' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AnswerTicket;