import React, { useState } from 'react';
import { connect } from 'react-redux';

import axiosWithAuth from '../../utils/axiosWithAuth';

const initialTicket = {
    id: '',
    title: '',
    description: '',
    answer: '',
    category: '',
    closed: false,
    student: '',
    helper: ''
}

const AddTicket = () => {
    const [ticket, setTicket] = useState(initialTicket);

    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        //axiosWithAuth post request here after adding StudentID and randomly assigning ticket id
        e.preventDefault();
        axiosWithAuth().post('url', {
            ...ticket, id: Date.now(), student: //!Need ID!
        })
            .then(res => console.log(res))
            .catch(err => console.log('AddTicket.js: Post: ', err));
        //need to move this to actions folder
        setTicket(initialTicket);
    }

    return (
        <div className='form-div'>
            <h2>Add Ticket Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className='inputs' type='text' name='title' placeholder='Title' value={ticket.title} onChange={handleChange} />
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

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {})(AddTicket);