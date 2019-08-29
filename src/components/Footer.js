import React from 'react'
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
  Button
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div className="footer">
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={16}>
            <Header inverted as='h3' content='About Salty Hackers' />
            <p>
              This site was created to showcase the saltiest commenters on hacker news.<br/> Using a variety of sentiment analysis methodologies, we're able to rank individual users and comments based on how "salty" they are.
            </p>
            <Button><Link to="/about-us" style={{color: '#000'}}>About Team</Link></Button>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Header centered as="h4" id="footer-site-title" content='Salty Hackers' />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
)

export default Footer