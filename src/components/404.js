import React from 'react';

const container = {
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  width: 'fit-content',
  margin: 'auto',

};

const NoMatch = () => {
  return (
    <div className='404-container' style={container}>
      <h1 style={{fontSize: '500%'}}>404</h1>
      <h5>{`The requested URL ${window.location.pathname} was not found on this server.`}</h5>
    </div>
  );
};

export default NoMatch;
