import React from 'react';
import { Link } from 'react-router-dom';

const Tab = props => {
  return (
    <div className='tab-container'>
      <p>{props.tab.icon}</p>
      <div className='tab-info'>
        <Link to={`/home/tabs/${props.tab.id}`}>
          <span className='tab-title'>{props.tab.title}</span>
        </Link>
        <a href={props.tab.url} target='_blank' rel='noopener noreferrer'>
          <p className='tab-url'>{props.tab.url}</p>
        </a>
      </div>
      <div className='title-hamburger-container'>
        <Link to={`/home/tabs/${props.tab.id}`}>
          <div>
            <div className='hamburger' />
            <div className='hamburger' />
            <div className='hamburger' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Tab;
