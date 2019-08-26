import React from 'react';
import { Card } from 'semantic-ui-react'



const UserCard = (props) => {
    console.log('props in userCard', props)
    // TODO: handleClick function. Should route to userPage by pushing that onto history. Or, wrap in Link. 

    return (
        <Card fluid>
            <div className="userCard">
                <div>{props.user.username}</div>
                <div>Salty Score: {props.user.saltyScore}</div>
            </div>
            {/* <img src={`https://robohash.org/${props.user.username}.png?set=set5`}/> */}
        </Card>
    )
}



export default UserCard;