import React from "react";
import {Route, Redirect } from "react-router-dom";
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const DataDisplayComponents = ({ match }) => (
  //Redirect to GCME staking site
  <Route path={`${APP_PREFIX_PATH}/dashboards/stake`}
    render={() => {
      window.open("https://gocryptomestake.netlify.app/", '_blank');
      return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
    }}
  />
);

export default DataDisplayComponents;