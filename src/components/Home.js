import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import GoogleLoginButton from './GoogleLoginButton';

const container = {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: 'fit-content',
    margin: 'auto'
  },
  title = {
    fontSize: '500%'
  },
  buttons = {
    width: '100%',
    borderRadius: '3rem',
    fontSize: '1.25rem'
  },
  anchors = {
    display: 'block',
    color: 'white',
    textDecoration: 'none',
  };

const Home = ({ auth }) => {
  
  return (
    <div className='home-container' style={container}>
      <h1>Welcome to</h1>
      <h1 style={title}>the.Portal</h1>
      <br/>
      <br/>
      <br/>
      <div className='home-buttons'>
        <Button variant='primary' style={buttons}>
          <Link to="/signup" id='signup-button' style={anchors}>Sign up</Link>
        </Button>
        <br/>
        <br/>
        <Button variant='primary' style={buttons}>
          <Link to="/login" style={anchors}>Log in</Link>
        </Button>
        <br/>
        <br/>
        <Button variant="outline-primary" id='google-auth-button'
                onClick={auth.login} style={buttons}>
          <GoogleLoginButton/>
        </Button>
      </div>
    </div>
  );
};

export default Home;
