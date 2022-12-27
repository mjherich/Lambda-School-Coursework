import React from 'react';
import { connect } from 'react-redux';
import { getData, updateTab } from '../actions';
import Loader from 'react-loader-spinner';

import TabsByCategory from './TabsByCategory';

import './TabsList.scss';

class TabsList extends React.Component {
  state = {
    activeTab: null
  };

  componentDidMount() {
    // alert('CDM triggered in TabsList');
    this.props.getData();
  }

  render() {
    if (this.props.fetching) {
      return (
        <Loader type='TailSpin' color='#e4be4d' height={100} width={100} />
      );
    } else if (this.props.filteredTabs) {
      return (
        <div className='tabslist-container'>
          {this.props.categories.map(category => {
            const filteredTabs = this.props.filteredTabs.filter(
              tab => tab.category === category
            );
            return (
              <TabsByCategory
                category={category}
                tabs={filteredTabs}
                key={category}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className='tabslist-container'>
          {this.props.categories.map(category => {
            const filteredTabs = this.props.tabs.filter(
              tab => tab.category === category
            );
            return (
              <TabsByCategory
                category={category}
                tabs={filteredTabs}
                key={category}
              />
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  tabs: state.tabs,
  categories: state.categories,
  fetching: state.fetching,
  filteredTabs: state.filteredTabs
});

export default connect(
  mapStateToProps,
  { getData, updateTab }
)(TabsList);
