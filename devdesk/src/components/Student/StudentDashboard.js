import React from 'react'

import TicketList from '../Ticket/TicketList';

const StudentDashboard = () => {

    return (
        <div className='dashboard'>
            <h2>Student Dashboard</h2>
            <TicketList />
        </div>
    )
}

export default StudentDashboard;