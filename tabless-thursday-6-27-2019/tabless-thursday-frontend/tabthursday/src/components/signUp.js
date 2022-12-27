import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import { Link } from 'react-router-dom';


import './signUp.scss';
import SignUpImg from '../assets/SignUpIMG.png' 

class SignUp extends React.Component {
  state = {
    creds: {
      email: '',
      password: ''
    }
  };

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    });
  };

  signUp = e => {
    e.preventDefault();
    this.props.signUp(this.state.creds).then(res => {
      res && this.props.history.push('/login');
    });
  };

  render() {
    return (
      <div className='signup-form'>
        <form onSubmit={this.signUp}>
          <h1>Create Your Account</h1>
          <p className = 'have-account'>Already have an account? <Link to = '/login'>Log In</Link></p>
          <input
            type='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChanges}
            name='email'
          />
          <input
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChanges}
            name='password'
          />
          <button>Sign Up!</button>
        </form>
        <div className = 'sign-up-img'>
        <div className = 'text-on-top'>
          <h1>Tabless Thursdays</h1>
          <h2>Best Tab Management</h2>
        </div>
          <img src = {SignUpImg} alt = 'computer'></img>
        
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggingIn: state.isLoggingIn,
  error: ''
});

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
