import React, { useState } from 'react';
import { connect } from 'react-redux';

import { postTicket } from '../../store/actions'

const initialTicket = {
    name: '',
    description: '',
    category: '',
}

const AddTicket = (props) => {
    const [ticket, setTicket] = useState(initialTicket);

    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ticket)
        props.postTicket(ticket);
        setTicket(initialTicket);
    }

    return (
        <div className='form-div'>
            <h2>Add Ticket Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className='inputs' type='text' name='name' placeholder='Title' value={ticket.title} onChange={handleChange} />
                <label>Category</label>
                <select className='inputs' name='category' onChange={handleChange} value={ticket.category}>
                    <option>Select a category</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">Javascript</option>
                    <option value="react">React</option>
                    <option value="redux">Redux</option>
                    <option value="other">Other</option>
                </select>
                <label>Description</label>
                <textarea className='inputs' name='description' placeholder='How can I ....' onChange={handleChange} value={ticket.description} />
                <button type='submit'>Submit Ticket</button>
            </form>
        </div>
    )
}

export default connect(null, { postTicket })(AddTicket);