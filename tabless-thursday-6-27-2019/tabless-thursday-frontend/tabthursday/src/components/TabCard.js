import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { getData } from '../actions';
// import { Modal } from 'react-bootstrap';

import './TabCard.scss';

const TabCard = props => {
  const id = props.match.params.id;
  const tab = props.tabs.find(tab => `${tab.id}` === id);
  if (!tab) {
    props.getData();
    return <Loader type='TailSpin' color='#e4be4d' height={100} width={100} />;
  } else {
    return (
      <div className='tab-card-container'>
        <h1>TabCard</h1>
        <p>{tab.title}</p>
        <p>{tab.description}</p>
        <p>{tab.url}</p>
        <button onClick={e => props.setUpdateForm(e, tab)}>Update</button>
        <button onClick={e => props.deleteTab(e, tab.id)}> Delete Tab </button>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  fetching: state.fetching,
  error: state.error,
  tabs: state.tabs
});
export default connect(
  mapStateToProps,
  { getData }
)(TabCard);
