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
import {TwoLevelPieChart } from './Charts.js';
import styled from 'styled-components';
import { UserComments } from './UserComments.js';

const CardContainer = styled.div`
    position: fixed;
    width: 400px;

    @media (max-width: 767px) {
        position: relative;
    }
`;

const StyledSegment = styled(Segment)`
    width: 200px;
    height: 80px;
    text-align: center;
`;

const UserProfile = ({ user, saltiUser }) => {
    let formatNumber = number => {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    let formatDate = date => {
        let createdDate = new Date(date * 1000);
        let day = createdDate.getDay();
        let month = createdDate.getMonth() + 1;
        let year = createdDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    let comments = JSON.parse(saltiUser.comments);
    let pieChartData = [
        { name: 'Salty', value: comments.length },
        { name: 'All', value: user.submitted.length },
    ];

    return (
        <Container>
            <Grid stackable>
                <Grid.Column width={5}>
                    <CardContainer>
                        <Header as="h1" content="User Profile" />
                        <Card>
                            <Card.Content>
                                <Card.Header as="h2" content={user.id} />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: user.about,
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
                                        {formatNumber(user.submitted.length)}
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
                    <Header as="h1" content="Saltiness vs Non-Salty" />
                    <div style={{ display: 'flex' }}>
                        <TwoLevelPieChart data={pieChartData} />
                        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                            <StyledSegment>
                                <Header as="h2" content={`45`} />
                                <p>Average Saltiness</p>
                            </StyledSegment>
                            <StyledSegment>
                                <p>45</p>
                                <p>Average Saltiness</p>
                            </StyledSegment>
                        </div>
                    </div>
                    <Header as="h1" content="Saltiest Comments" />
                    <UserComments comments={comments} />
                </Grid.Column>
            </Grid>
        </Container>
    );
};
export default UserProfile;
