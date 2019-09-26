import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import axiosWithAuth from '../../utils/axiosWithAuth';
import { fetchSingleTicket, putTicket } from '../../store/actions';

const AnswerTicket = (props) => {
    const [answer, setAnswer] = useState('');
    const singleTicket = props.singleTicket;
    const id = props.match.params.id;

    useEffect(() => {
        props.fetchSingleTicket(id);
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        //axiosWithAuth put request here- change answer, helper id, and closed properties
        props.putTicket(id, answer);
        setAnswer('');
        //redirect to dashboard or individual ticket route to see updated ticket
    }

    return (
        <div className='form-div'>
            <h2>Answer Ticket Form</h2>
            <div>
                <h3>{singleTicket.name}</h3>
                <p>{singleTicket.category}</p>
                <p>{singleTicket.description}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Response:</label>
                <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Answer here' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        singleTicket: state.singleTicket
    }
}

export default connect(mapStateToProps, { fetchSingleTicket, putTicket })(AnswerTicket);