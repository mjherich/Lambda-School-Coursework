import React from 'react';


const UserCard = (props) => {
    // handleClick function. Should route to userPage by pushing that onto history
    return (
        <div>Username: {props.user.username} Salty Score: {props.user.saltyScore}</div>
    )
}

export default UserCard;