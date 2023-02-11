import AppStyles from './App.module.css';

import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Main from '../Main/Main';
import AppHeader from '../AppHeader/AppHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgotPassword';
import { ResetPasswordPage } from '../../pages/resetPassword';
import { ProfilePage } from '../../pages/profile';
import { NotFoundPage } from '../../pages/notFound';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();

  const history = useNavigate();

  const location = useLocation();
  const modalBackground = location.state?.modalBackground;

  const { ingredientsByType } = useSelector(state => state.menu);

  const { refreshToken } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  
  return (
    <div className={AppStyles.main + ' m-10'}>
      <AppHeader />
      <main className={AppStyles.container}>
          <Routes location={ modalBackground || location}>
              <Route path="/" exact element={<Main/>} />
              <Route path="/ingredients/:ingredientId" element={ingredientsByType && <IngredientDetails/>} />

              <Route path="/login" element={ <ProtectedRoute element={<LoginPage />} isAuthPage /> } />
              <Route path="/profile" element={ <ProtectedRoute element={<ProfilePage/>}/> } />

              <Route path='*' element={ <NotFoundPage/> } />
              
            {/* 
            <Route path="/register">
              { !refreshToken && <RegisterPage />}
              { refreshToken && <Navigate to={{pathname: "/"}}/>}
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
             */}
          </Routes>
          { modalBackground && (
            <Routes>
              <Route path="/ingredients/:ingredientId" element={
                  <Modal title='Детали ингридиента' onClose={() => history(-1)} >
                    {ingredientsByType && <IngredientDetails/>}
                  </Modal>
                }
              />
            </Routes>
          )}
      </main>
      
    </div>
  );
}

export default App;
