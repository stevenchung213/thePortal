import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const container = {
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    width: 'fit-content',
    margin: 'auto'
  },
  button = {
    width: '100%',
    borderRadius: '3rem',
    fontSize: '1.25rem'
  },
  anchors = {
    display: 'block',
    color: 'white',
    textDecoration: 'none',
  };

const Home = () => {
  return (
    <div className='home-container' style={container}>
      <h2>Store your favorite GIPHYs,</h2>
      <h2>access them anywhere</h2>
      <br/>
      <br/>
      <h5>Join Portal today.</h5>
      <br/>
      <div className='home-buttons'>
        <Button variant='primary' style={button}>
          <Link to="/signup" id='signup-button' style={anchors}>Sign up</Link>
        </Button>
        <br/>
        <br/>
        <Button variant='primary' style={button}>
          <Link to="/login" id='login-button' style={anchors}>Log in</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
