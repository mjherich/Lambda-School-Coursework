import React from 'react'
import { connect } from 'react-redux';

const TicketCard = ({ ticket, userType }) => {

    return (
        <div className='ticket-card'>
            <h3>{ticket.name}</h3>
            <p>Category: {ticket.category}</p>
            <p>Status: {!ticket.active ? 'Closed' : 'Open'}</p>
            {userType === 'helper' ? <button>Answer Ticket</button> : null}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userType: state.userType
    }
}

export default connect(mapStateToProps, {})(TicketCard);
