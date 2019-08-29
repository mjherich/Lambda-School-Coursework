import React, { useEffect, useState } from 'react';

//Componetns
import { Header } from 'semantic-ui-react';
import UserProfile from './UserProfile';

import { useStateValue } from '../../state';

import axios from 'axios';

const UserProfileContainer = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [saltiUser, setSaltiUser] = useState({});
    const [{ theme }, dispatch] = useStateValue();

    let username = props.match.params.username || 'pg';

    useEffect(() => {
        fetch(
            `https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('did not fetch');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
        axios
            .post(
                'https://cors-anywhere.herokuapp.com/http://hackernews-serving.herokuapp.com/user',
                { username: `${username}` }
            )
            .then(response => {
                if (!response.status == 200) {
                    throw new Error('failed to axios');
                }
                setSaltiUser(response.data[0]);
                console.log(response.data[0]);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            {isLoading ? (
                <Header as="h1" content="Loading" inverted={theme} />
            ) : user !== null ? (
                <UserProfile user={user} saltiUser={saltiUser} />
            ) : (
                <Header as="h2" content="Not a user" />
            )}
        </>
    );
};

export default UserProfileContainer;
