import React, { useState } from 'react';

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
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type='text' name='title' placeholder='Title' value={ticket.title} onChange={handleChange} />
                <select name='category' onChange={handleChange}>
                    <option>Select a category</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">Javascript</option>
                    <option value="react">React</option>
                    <option value="redux">Redux</option>
                    <option value="other">Other</option>
                </select>
                <label>Description</label>
                <textarea name='description' placeholder='How can I ....' onChange={handleChange} />
                <button type='submit'>Submit Ticket</button>
            </form>
        </div>
    )
}

export default AddTicket;