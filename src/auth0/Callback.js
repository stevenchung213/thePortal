import React from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Callback = ({ auth, history }) => {

  auth.handleAuthentication().then(() => {
    console.log('***CALLBACK.auth****\n', auth)
    const { profile: { nickname } } = auth;
    history.push(`/`);
  });

  return (
    <div>
      <Spinner animation='grow' />
    </div>
  );
};

export default withRouter(Callback);
