import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import TicketCard from './TicketCard'

const TicketList = (props) => {
    return (
        <div className='ticket-grid'>
            {props.ticketArray.map(ticket => <Link className='ticket-link' to={`/ticket/${ticket.id}`} ><TicketCard key={ticket.ticketid} ticket={ticket} /> </Link>)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ticketArray: state.ticketArray
    }
}

export default connect(mapStateToProps, {})(TicketList);