import React from 'react';
import WordCloud from './WordCloud';
import {
    Card,
    Header,
    Grid,
    Container,
    Label,
    Icon,
    Segment,
} from 'semantic-ui-react';
import { TimeChart, TwoLevelPieChart } from './Charts.js';
import styled from 'styled-components';
import { UserComments } from './UserComments.js';

import { useStateValue } from '../state';

const CardContainer = styled.div`
    position: fixed;
    width: 400px;

    @media (max-width: 767px) {
        position: relative;
    }
`;

const UserProfile = ({ user, saltiUser }) => {
    const [{ theme }, dispatch] = useStateValue();

    let formatNumber = number => {
        if (number) {
            return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
    };

    let formatDate = date => {
        let createdDate = new Date(date * 1000);
        let day = createdDate.getDay();
        let month = createdDate.getMonth() + 1;
        let year = createdDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    let about = user.about ? user.about.substring(0, 300) : null;
    let comments = JSON.parse(saltiUser.comments);
    let submitted = user.submitted ? user.submitted.length : 0;

    let pieChartData = [
        { name: 'Salty', value: comments.length },
        { name: 'All', value: submitted },
    ];

    let width =
        window.innerWidth > 900
            ? window.innerWidth / 1.7
            : window.innerWidth / 1.2;

    let timeChartDate = comments.map((comment, index) => {
        return { name: index, value: comment.score };
    });

    return (
        <Container>
            <Grid stackable>
                <Grid.Column width={5}>
                    <CardContainer>
                        <Header
                            as="h1"
                            content="User Profile"
                            inverted={theme}
                        />
                        <Card>
                            <Card.Content>
                                <Card.Header as="h2" content={user.id} />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: about,
                                    }}
                                ></div>
                                <Card.Description>
                                    <Label
                                        color="red"
                                        style={{ marginTop: 10 }}
                                    >
                                        <Icon name="heart" />
                                        {formatNumber(user.karma)}
                                        <Label.Detail>Karma</Label.Detail>
                                    </Label>
                                    <Label
                                        color="yellow"
                                        style={{ marginTop: 10 }}
                                    >
                                        <Icon name="send" />
                                        {formatNumber(submitted)}
                                        <Label.Detail>Submissions</Label.Detail>
                                    </Label>
                                    <Label
                                        color="teal"
                                        style={{ marginTop: 10 }}
                                    >
                                        <Icon name="calendar alternate" />
                                        {formatDate(user.created)}
                                        <Label.Detail>
                                            Created Date
                                        </Label.Detail>
                                    </Label>
                                </Card.Description>
                                <Card
                                    image="https://sanaakosirickylee.files.wordpress.com/2016/09/spilled-salt-bottle-on-table.jpg?w=600"
                                    header={`Verdict: ${'Salty!'}`}
                                    description={`Our analysis says: ${user.id} is salty!`}
                                ></Card>
                            </Card.Content>
                        </Card>
                    </CardContainer>
                </Grid.Column>
                <Grid.Column width={11}>
                    <WordCloud username={user.id} />
                    <Header
                        as="h1"
                        content="Saltiness per comment"
                        inverted={theme}
                    />

                    <TimeChart
                        width={width}
                        data={timeChartDate}
                        dataKeyX="name"
                        dataKeyY="value"
                    />

                    <Header
                        as="h1"
                        content="Saltiest Comments"
                        inverted={theme}
                    />
                    <UserComments comments={comments} />
                </Grid.Column>
            </Grid>
        </Container>
    );
};
export default UserProfile;
