import React, { useState } from 'react';
import WordCloud from './WordCloud';
import {
    Card,
    Header,
    Grid,
    Container,
    Label,
    Icon,
    Table,
    Segment,
} from 'semantic-ui-react';
import { TimeChart } from './Charts.js';
import { Pie, PieChart, Sector, Cell } from 'recharts';
import styled from 'styled-components';

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

const tableData = [
    {
        score: -0.4,
        comment: 'non mauris morbi non lectus aliquam sit amet diam in magna',
    },
    {
        score: -0.7,
        comment:
            'semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut',
    },
    {
        score: 0.4,
        comment:
            'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac',
    },
    {
        score: 0.9,
        comment:
            'nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel',
    },
    {
        score: -0.8,
        comment:
            'id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus',
    },
    {
        score: 0.2,
        comment:
            'non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac',
    },
    {
        score: -0.3,
        comment:
            'ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient',
    },
    {
        score: -0.9,
        comment:
            'justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices',
    },
    {
        score: 0.2,
        comment:
            'vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices',
    },
    {
        score: -0.9,
        comment:
            'id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo',
    },
    {
        score: -0.7,
        comment:
            'molestie lorem quisque ut erat curabitur gravida nisi at nibh in',
    },
    {
        score: 0.8,
        comment:
            'nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem',
    },
    {
        score: 0.1,
        comment:
            'id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit',
    },
    {
        score: 0.6,
        comment:
            'nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam',
    },
    {
        score: 0.0,
        comment:
            'in felis donec semper sapien a libero nam dui proin leo odio porttitor id',
    },
    {
        score: -0.5,
        comment:
            'sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at',
    },
    {
        score: 0.3,
        comment:
            'sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum',
    },
    {
        score: -0.2,
        comment:
            'ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
    },
    {
        score: 0.5,
        comment:
            'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl',
    },
    {
        score: -0.8,
        comment:
            'at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel',
    },
    {
        score: 0.1,
        comment:
            'quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a',
    },
    {
        score: -0.0,
        comment:
            'duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac',
    },
    {
        score: 0.6,
        comment:
            'vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam',
    },
    {
        score: 0.6,
        comment:
            'laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue',
    },
    {
        score: -0.4,
        comment:
            'at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet',
    },
    {
        score: 1.0,
        comment:
            'ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed',
    },
    {
        score: -0.1,
        comment: 'arcu libero rutrum ac lobortis vel dapibus at diam nam',
    },
    {
        score: -0.7,
        comment:
            'at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin',
    },
    {
        score: -0.4,
        comment:
            'justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo',
    },
    {
        score: -0.0,
        comment:
            'in est risus auctor sed tristique in tempus sit amet sem fusce',
    },
];

const UserProfile = ({ user }) => {
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

    const data = [
        { name: 'Salty', value: 100 },
        { name: 'Normal', value: 400 },
    ];

    const COLORS = ['#0088FE', '#00C49F'];

    const renderActiveShape = props => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#333"
                >{`${value} Comments`}</text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    fill="#999"
                >
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    const TwoLevelPieChart = () => {
        const [activeIndex, setActiveIndex] = useState(0);

        const onPieEnter = (data, index) => {
            setActiveIndex(index);
        };

        return (
            <PieChart width={450} height={200}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx={200}
                    cy={100}
                    innerRadius={40}
                    outerRadius={60}
                    onMouseEnter={onPieEnter}
                >
                    {data.map((entry, index) => (
                        <Cell fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        );
    };

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
                        <TwoLevelPieChart />
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
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Salty Score</Table.HeaderCell>
                                <Table.HeaderCell>Comment</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {tableData.map(item => {
                                return (
                                    <Table.Row negative={item.score < 0}>
                                        <Table.Cell>{item.score}</Table.Cell>
                                        <Table.Cell>{item.comment}</Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
        </Container>
    );
};
export default UserProfile;
