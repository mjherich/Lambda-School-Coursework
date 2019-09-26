import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import TicketList from '../Ticket/TicketList';

import { fetchTickets } from '../../store/actions'

const StudentDashboard = (props) => {
    useEffect(() => {
        props.fetchTickets()
    }, [])
    return (
        <div className='dashboard'>
            <h2 className='dash-title'>Student Dashboard</h2>
            <Link to='/add-ticket' className='add-ticket-btn'>Add Ticket</Link>
            <TicketList />
        </div>
    )
}

export default connect(null, { fetchTickets })(StudentDashboard);