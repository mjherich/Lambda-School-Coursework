import React from 'react';
import { updateTab } from '../actions';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Loader from 'react-loader-spinner';

import tabLogo from '../assets/LockupYellow.png';
import './UpdateForm.scss';

class UpdateForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: this.props.activeTab,
      modal: true
    };
  }

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      activeTab: {
        ...this.state.activeTab,
        [e.target.name]: e.target.value
      }
    });
  };

  updateTab = e => {
    e.preventDefault();
    this.props.updateTab(this.state.activeTab).then(res => {
      res && this.props.history.push('/home');
    });
    this.setState({
      activeTab: ''
    });
  };
  render() {
    if (!this.state.activeTab) {
      return (
        <Loader type='TailSpin' color='#e4be4d' height={100} width={100} />
      );
    } else {
      return (
        <Modal
          isOpen={this.state.modal}
          className='update-form-container'
          centered
          autoFocus
        >
          <ModalHeader toggle={e => this.props.history.push('/home')}>
            <img src={tabLogo} alt='Tabless Thursday Logo' />
          </ModalHeader>
          <ModalBody>
            <form>
              <h1>Update Tab</h1>
              <h4>Title</h4>
              <input
                type='text'
                value={this.state.activeTab.title}
                onChange={this.handleChanges}
                name='title'
              />
              <h4>Description</h4>
              <input
                type='text'
                value={this.state.activeTab.description}
                onChange={this.handleChanges}
                name='description'
              />
              <h4>URL</h4>
              <input
                type='text'
                value={this.state.activeTab.url}
                onChange={this.handleChanges}
                name='url'
              />
              <select
                value={this.state.activeTab.category}
                onChange={this.handleChanges}
                name='category'
              >
                {this.props.categories.map(category => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              className='cancel-btn'
              onClick={e => this.props.history.push('/home')}
            >
              Cancel
            </Button>
            <Button className='update-btn' onClick={e => this.updateTab(e)}>
              Update Tab
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { updateTab }
)(UpdateForm);
