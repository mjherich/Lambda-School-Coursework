import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import { fetchSingleTicket } from '../../store/actions'

const DynamicTicket = (props) => {
    const singleTicket = props.singleTicket;
    const id = props.match.params.id;

    useEffect(() => {
        props.fetchSingleTicket(id);
    }, [id])

    const toForm = (e) => {
        props.history.push(`/answer-ticket/${singleTicket.ticketid}`);
    }

    return (
        <div>
            <h3>{singleTicket.name}</h3>
            <p>Status: {!singleTicket.active ? 'Closed' : 'Open'}</p>
            <p>Category: {singleTicket.category}</p>
            <p>{singleTicket.description}</p>
            {singleTicket.response ? <p>{singleTicket.response}</p> : null}
            {props.userType === 'helper' ? <button onClick={toForm}>Answer Ticket</button> : null}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        singleTicket: state.singleTicket,
        userType: state.userType
    }
}

export default connect(mapStateToProps, { fetchSingleTicket })(DynamicTicket);