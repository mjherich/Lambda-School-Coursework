import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchTabs } from '../actions';

import './navBar.scss';
import NavBarLogo from '../assets/LockupYellow.png';

class NavBar extends React.Component {
  state = {
    searchTerm: '',
    filteredTabs: []
  };

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearch = (e, searchTerm) => {
    e.preventDefault();
    e.persist();
    const filteredTabs = this.props.tabs.filter(tab =>
      tab.title.includes(searchTerm)
    );
    this.setState({
      filteredTabs: filteredTabs
    });
    // console.log('filteredTabs on state', this.state.filteredTabs);
    this.props.searchTabs(filteredTabs);
  };

  render() {
    const token = localStorage.getItem('token');
    if (!token) {
      return (
        <div className='nav-bar'>
          <div className='container-left'>
            <img src={NavBarLogo} alt='Tabless Logo' />
          </div>
          <div className='container-right'>
            <NavLink className='login' to='/login'>
              Login
            </NavLink>
            <NavLink className='signup' to='/signup'>
              Sign Up
            </NavLink>
          </div>
        </div>
      );
    } else {
      return (
        <div className='nav-bar-loggedin'>
          <div className='container-left'>
            <img src={NavBarLogo} alt='Tabless Logo' />
            <form onSubmit={e => this.handleSearch(e, this.state.searchTerm)}>
              <input
                className='searchbar'
                name='searchTerm'
                type='search'
                placeholder='Search Tabs'
                // incremental='true'
                onChange={this.handleChanges}
                // onSubmit={this.handleSearch}
                // onsearch={e => this.handleSearch(e, this.state.searchTerm)}
              />
            </form>
          </div>
          <div className='container-right'>
            <NavLink exact to='/home'>
              Home
            </NavLink>
            <Link to='/'>History</Link>
            <Link to='/'>Profile</Link>
            <Link to='/'>Account</Link>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  tabs: state.tabs,
  filteredTabs: state.filteredTabs
});

export default connect(
  mapStateToProps,
  { searchTabs }
)(NavBar);
