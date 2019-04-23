import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import GoogleLoginButton from "./GoogleLoginButton";

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
  title = {
    fontSize: '500%'
  };

const Login = ({ auth }) => {
  return (
    <div className='login-container' style={container}>
      <h1>Log in to</h1>
      <h1 style={title}>the.Portal</h1>
      <Form>
        <Form.Group controlId="formGroupUsername">
          <Form.Control type="username" placeholder="Username" size='lg'/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Control type="password" placeholder="Password" size='lg'/>
        </Form.Group>
        <Button variant="primary" type="submit" style={button}>
          Submit
        </Button>
        <br/>
        <br/>
        <Button variant="outline-primary" style={button} onClick={auth.login}>
          <GoogleLoginButton/>
        </Button>
      </Form>
    </div>
  );
};

export default Login;
