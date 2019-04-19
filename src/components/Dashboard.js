import React from 'react';
import { withRouter } from "react-router-dom";
import Navigation from './Navbar';

const dashboardContainer = {
  width: '100%',
  paddingTop: 56
};

const Dashboard = ({ auth }) => {

  const { name } = auth.getProfile();
  return (
    <div className="dashboard-container" id='top-nav' style={dashboardContainer}>
      <Navigation auth={auth}/>
      <h1>Welcome {name}.</h1>
    </div>
  )
};

export default withRouter(Dashboard);
