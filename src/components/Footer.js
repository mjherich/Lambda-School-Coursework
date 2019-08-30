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
import { useStateValue } from '../state';

const Footer = () => {
  const [{ theme }, dispatch] = useStateValue();

  return (
    <div className="footer">
      <Segment inverted={theme === 'dark' ? true : false} vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <Grid divided inverted={theme === 'dark' ? true : false} stackable>
            <Grid.Column width={16}>
              <Header inverted={theme === 'dark' ? true : false} as='h3' content='About Salty Hackers' />
              <p>
                This site was created to showcase the saltiest commenters on hacker news.<br /> Using a variety of sentiment analysis methodologies, we're able to rank individual users and comments based on how "salty" they are.
            </p>
              <Button><Link to="/about-us" style={{ color: '#000' }}>About Team</Link></Button>
            </Grid.Column>
          </Grid>

          <Divider inverted={theme === 'dark' ? true : false} section />
          <Header centered as="h4" id="footer-site-title" content='Salty Hackers' />
          <List horizontal inverted={theme === 'dark' ? true : false} divided link size='small'>
            <List.Item as='p'>
              A Lambda School Build Week Project
          </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  )
}

export default Footer