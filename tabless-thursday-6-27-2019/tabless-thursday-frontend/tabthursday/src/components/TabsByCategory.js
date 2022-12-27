import React from 'react';

import Tab from './Tab';
import { Link } from 'react-router-dom';

class TabsByCategory extends React.Component {
  render() {
    return (
      <div className='category-container'>
        <h2>{this.props.category}</h2>
        {this.props.tabs.map(tab => {
          return <Tab tab={tab} key={tab.id} />;
        })}
        <Link
          className='new-tab-link'
          to={{
            pathname: '/home/new-tab',
            state: { category: this.props.category }
          }}
        >
          <div>Add new tab</div>
        </Link>
      </div>
    );
  }
}

export default TabsByCategory;
