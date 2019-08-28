import React, { useEffect, useState } from 'react';

//Componetns
import { Header, Grid } from 'semantic-ui-react';
import { TimeChart } from './Charts';
import UserProfile from './UserProfile';

const UserProfileContainer = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

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
                setIsLoading(false);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {isLoading ? (
                <Header as="h1" content="Loading" />
            ) : user !== null ? (
                <UserProfile user={user} />
            ) : (
                <Header as="h2" content="Not a user" />
            )}
        </>
    );
};

export default UserProfileContainer;
