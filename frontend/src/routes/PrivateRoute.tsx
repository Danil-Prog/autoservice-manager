import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import AuthStore from '~/core/stores/Auth.store';

interface IPrivateRoute {
  children: React.ReactNode;
  authStore?: AuthStore;
}

@inject('authStore')
@observer
class PrivateRoute extends React.Component<IPrivateRoute> {
  override render() {
    const { children, authStore } = this.props;
    return authStore?.isAuthenticated ? children : <Navigate to="/login" />;
  }
}

export default PrivateRoute;
