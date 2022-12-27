import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { getData } from '../actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import tabLogo from '../assets/LockupYellow.png';

import './TabCard.scss';

class TabCardModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modal: true
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  render() {
    const id = this.props.match.params.id;
    const tab = this.props.tabs.find(tab => `${tab.id}` === id);
    if (!tab) {
      //   alert('getData triggered inside TabCardModal');
      this.props.getData();
      console.log('getData from TabCardModal');
      return (
        <Loader type='TailSpin' color='#e4be4d' height={100} width={100} />
      );
    } else {
      return (
        <div>
          <Modal
            isOpen={this.state.modal}
            className='tab-card-container'
            centered
            autoFocus
          >
            <ModalHeader toggle={e => this.props.history.push('/home')}>
              <img src={tabLogo} alt='Tabless Thursday Logo' />
            </ModalHeader>
            <ModalBody>
              <h1>{tab.title}</h1>
              <h4>Description</h4>
              <p>{tab.description}</p>
              <h4>Tab URL</h4>
              <a href={tab.url}>{tab.url}</a>
            </ModalBody>
            <ModalFooter>
              <Button
                className='cancel-btn'
                onClick={e => this.props.history.push('/home')}
              >
                Cancel
              </Button>
              <Button
                className='update-btn'
                onClick={e => this.props.setUpdateForm(e, tab)}
              >
                Update
              </Button>
              <Button
                className='delete-btn'
                onClick={e => this.props.deleteTab(e, tab.id)}
              >
                Delete Tab
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  fetching: state.fetching,
  error: state.error,
  tabs: state.tabs
});
export default connect(
  mapStateToProps,
  { getData }
)(TabCardModal);
