import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const TicketCard = ({ ticket, userType, history }) => {

    const toForm = (e) => {
        history.push(`/answer-ticket/${ticket.ticketid}`);
    }

    return (
        <div className='ticket-card'>
            <Link className='ticket-link' to={`/ticket/${ticket.ticketid}`} >
                <div>
                    <h3 className='ticket-header'>{ticket.name}</h3>
                    <p>Category: {ticket.category}</p>
                    {!ticket.active ? <p className='closed-ticket'>Closed</p> : <p className='open-ticket'>Open</p>}
                </div>
            </Link>
            {userType === 'helper' ? <button onClick={toForm}>Answer Ticket</button> : null}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userType: state.userType
    }
}

export default connect(mapStateToProps, {})(TicketCard);
