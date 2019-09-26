import React from 'react'
import { connect } from 'react-redux';

import TicketCard from './TicketCard'

const TicketList = (props) => {
    return (
        <div className='ticket-grid'>
            {props.ticketArray.map(ticket => <TicketCard key={ticket.ticketid} ticket={ticket} history={props.history} />)
            }
        </div >
    )
}

const mapStateToProps = state => {
    return {
        ticketArray: state.ticketArray
    }
}

export default connect(mapStateToProps, {})(TicketList);