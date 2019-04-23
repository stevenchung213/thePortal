import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

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

const Signup = () => {
  return (
    <div className='signup-container' style={container}>
      <h1>Sign up with</h1>
      <h1 style={title}>the.Portal</h1>
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Control type="email" placeholder="Email" size='lg'/>
        </Form.Group>
        <Form.Group controlId="formGroupUsername">
          <Form.Control type="username" placeholder="Username" size='lg'/>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Control type="password" placeholder="Password" size='lg'/>
          <Form.Text className="text-muted">
            At least 6 characters.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" style={button}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
