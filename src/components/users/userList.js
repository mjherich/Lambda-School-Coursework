import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './userCard';
import { Card } from 'semantic-ui-react';
import Pagination from '../common/Pagination';
import './user.scss';

import { useStateValue } from '../../state';

const UserList = props => {
    // console.log("props in UserList", props);

    const [users, setUsers] = useState([]);
    const [{ theme }, dispatch] = useStateValue();

    useEffect(() => {
        axios
            .post(
                'https://cors-anywhere.herokuapp.com/http://hackernews-serving.herokuapp.com/salt',
                { mode: 'average' }
            )
            .then(response => {
                console.log(response);
                let sorted = response.data.sort((a, b) => {
                    return b.score - a.score;
                });
                setUsers(sorted);

                // let json = JSON.parse(response.data)
                // console.log('JSON', json)
            });
    }, []);

    useEffect(() => {
        console.log(theme);
        dispatch({
            type: 'updateTheme',
            payload: 'dark',
        });
    }, []);

    console.log(theme);

    // return paginated .map over list of users, rendering a UserCard for each
    return (
        <Card.Group className="cardGroup" itemsPerRow="1">
            {users !== [] ? (
                <Pagination
                    dataArray={users}
                    render={function paginatedData(props) {
                        return (
                            <>
                                {props.handleShowCount(10)}
                                {props.paginatedData.map(
                                    function renderPaginatedData(data) {
                                        return <UserCard user={data} />;
                                    }
                                )}
                            </>
                        );
                    }}
                />
            ) : (
                <h1>Users not found</h1>
            )}
            {/* {uses.map(user => {
        return <UserCard user={user} props={props} />;
      })} */}
        </Card.Group>
    );
};

export default UserList;
