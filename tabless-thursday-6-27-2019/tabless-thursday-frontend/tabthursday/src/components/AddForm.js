import React from 'react';
import { connect } from 'react-redux';
import { addTab } from '../actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import tabLogo from '../assets/LockupYellow.png';
import './AddForm.scss';

class AddForm extends React.Component {
  state = {
    tab: {
      title: '',
      description: '',
      url: '',
      category: this.props.location.state.category
    },
    modal: true
  };

  handleChanges = e => {
    this.setState({
      tab: {
        ...this.state.tab,
        [e.target.name]: e.target.value
      }
    });
  };

  addTab = e => {
    // e.persist();
    e.preventDefault();
    this.props.addTab(this.state.tab).then(res => {
      res && this.props.history.push('/home');
    });
  };

  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        className='add-form-container'
        centered
        autoFocus
      >
        <ModalHeader toggle={e => this.props.history.push('/home')}>
          <img src={tabLogo} alt='Tabless Thursday Logo' />
        </ModalHeader>
        <ModalBody>
          <form>
            <h1>Add Tab</h1>
            <input
              type='text'
              placeholder='Enter Title'
              value={this.state.tab.title}
              onChange={this.handleChanges}
              name='title'
            />
            <input
              type='text'
              placeholder='Enter Description'
              value={this.state.tab.description}
              onChange={this.handleChanges}
              name='description'
            />
            <input
              type='text'
              placeholder='Enter URL'
              value={this.state.tab.url}
              onChange={this.handleChanges}
              name='url'
            />
            <select
              value={this.state.tab.category}
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
          <Button className='add-btn' onClick={e => this.addTab(e)}>
            Add Tab
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { addTab }
)(AddForm);
