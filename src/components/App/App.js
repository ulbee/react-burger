import AppStyles from './App.module.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Main from '../Main/Main';
import AppHeader from '../AppHeader/AppHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgotPassword';
import { ResetPasswordPage } from '../../pages/resetPassword';
import { ProfilePage } from '../../pages/profile';

function App() {
  const dispatch = useDispatch();


  const { refreshToken } = useSelector(state => state.user);
  
  
  return (
    <div className={AppStyles.main + ' m-10'}>
      <AppHeader />      
      <main className={AppStyles.container}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Main />              
            </Route>
            <Route path="/login">
              { !refreshToken && <LoginPage />}
              { refreshToken && <Redirect to={{pathname: "/"}}/>}
            </Route>
            <Route path="/register">
              { !refreshToken && <RegisterPage />}
              { refreshToken && <Redirect to={{pathname: "/"}}/>}
            </Route>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password">
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute path="/profile">
              <ProfilePage />
            </ProtectedRoute>
            <Route path="/ingredients/:id">

            </Route>
            <Route path='*'>
              404
            </Route>
          </Switch>
        </Router>
      </main>
      
    </div>
  );
}

export default App;
