import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import TicketList from '../Ticket/TicketList';
import { fetchTickets } from '../../store/actions'

const HelperDashboard = (props) => {
    useEffect(() => {
        props.fetchTickets()
    }, [])
    return (
        <div className='dashboard'>
            <h2>Helper Dashboard</h2>
            <TicketList history={props.history} />
        </div>
    )
}

export default connect(null, { fetchTickets })(HelperDashboard);