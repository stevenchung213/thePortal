import React from 'react';
import { Route, withRouter } from "react-router-dom";
import Giphy from "./Giphy/Giphy";

const dashboardContainer = {
  width: '100%',
  paddingTop: 56
};

const Dashboard = ({ auth }) => {
  
  const { name } = auth.getProfile();
  return (
    <div className="dashboard-container" id='top-nav' style={dashboardContainer}>
      <h1>Welcome {name}.</h1>
    </div>
  )
};

export default withRouter(Dashboard);
