import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Layout from '../Layout';

function PrivateRoute({ component: Component, pageMode = '', ...rest }) {
  const isAuthenticated = useSelector(state =>
    _.get(state, 'session.isAuthenticated'),
  );

  const renderScreen = props => {
    if (isAuthenticated) {
      return (
        <Layout>
          <Component pageMode={pageMode} {...props} />
        </Layout>
      );
    } else return <Redirect to="/login" />;
  };

  return <Route {...rest} render={renderScreen} />;
}
export default PrivateRoute;
