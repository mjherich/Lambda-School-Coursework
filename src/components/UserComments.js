import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

export const UserComments = props => {
    console.log(props.comments);
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>View</Table.HeaderCell>
                    <Table.HeaderCell>Comment</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.comments.map(item => {
                    return (
                        <Table.Row>
                            <Table.Cell>
                                <a
                                    target="_blank"
                                    href={`https://news.ycombinator.com/item?id=${item.id}`}
                                >
                                    <Icon name="eye" />
                                </a>
                            </Table.Cell>
                            <Table.Cell>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.text,
                                    }}
                                ></div>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};
