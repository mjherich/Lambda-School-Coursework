import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import WordCloud from './WordCloud'

const UserProfile = props => {
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

    let formatNumber = number => {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    let formatDate = timestamp => {
        return new Date(timestamp * 1000);
    };

    return (
        <>
            <Header as="h1" content="User Profile" />
            {isLoading ? (
                <Header as="h1" content="Loading" />
            ) : user !== null ? (
                <div>
                    <Header as="h2" content={user.id} />
                    <Header as="h3" content={user.about} />
                    <Header
                        as="h3"
                        content={`Karma: ${formatNumber(user.karma)}`}
                    />
                    <Header
                        as="h3"
                        content={`Submissions: ${formatNumber(
                            user.submitted.length
                        )}`}
                    />
                    <Header
                        as="h3"
                        content={`Created: ${formatDate(user.created)}`}
                    />
                </div>
            ) : (
                <div>
                    <Header as="h2" content="Not a user" />
                    <WordCloud />
                </div>
            )}
        </>
    );
};

export default UserProfile;
