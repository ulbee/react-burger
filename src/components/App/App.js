import AppStyles from './App.module.css';

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Main from '../Main/Main';
import AppHeader from '../AppHeader/AppHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Orders from '../Orders/Orders';

import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgotPassword';
import { ResetPasswordPage } from '../../pages/resetPassword';
import { ProfilePage } from '../../pages/profile';
import { UserOrdersPage } from '../../pages/userOrdersPage';
import { NotFoundPage } from '../../pages/notFound';
import { LogoutPage } from '../../pages/logoutPage';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { getIngredients } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/user';

function App() {
  const dispatch = useDispatch();

  const history = useNavigate();

  const location = useLocation();
  const modalBackground = location.state?.modalBackground;

  const { ingredientsByType } = useSelector(state => state.menu);
  const { orders } = useSelector(state => state.ws.feed);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);
  
  return (
    <div className={AppStyles.main + ' m-10'}>
      <AppHeader />
      <main className={AppStyles.container}>
          <Routes location={ modalBackground || location}>
              <Route path="/" element={<Main/>} />
              <Route path="/ingredients/:ingredientId" element={ingredientsByType && <IngredientDetails/>} />
              <Route path="/feed" element={<Orders/>} />
              <Route path="/feed/:orderId" element={<OrderDetails/>} />

              <Route path="/profile" element={ <ProtectedRoute element={<ProfilePage/>}/> } />
              <Route path="/profile/orders" element={ <ProtectedRoute element={<UserOrdersPage/>}/> } />
              <Route path="/profile/orders/:orderId" element={ <ProtectedRoute element={<OrderDetails/>}/> } />
              <Route path="/login" element={ <ProtectedRoute element={<LoginPage />} isAuthPage /> } />
              <Route path="/register" element={ <ProtectedRoute element={<RegisterPage />} isAuthPage /> } />
              <Route path="/forgot-password" element={ <ProtectedRoute element={<ForgotPasswordPage />} isAuthPage /> } />
              <Route path="/reset-password" element={ <ProtectedRoute element={<ResetPasswordPage />} isAuthPage accessFrom='/forgot-password'/> } />
              <Route path="/logout" element={ <LogoutPage /> } />

              <Route path='*' element={ <NotFoundPage/> } />
          </Routes>
          { modalBackground && (
            <Routes>
              <Route path="/ingredients/:ingredientId" element={
                  <Modal title='Детали ингридиента' onClose={() => history(-1)} >
                    {!ingredientsByType && <p>Загружаем данные</p>}
                    {ingredientsByType && <IngredientDetails />}
                  </Modal>
                }
              />
              <Route path="/feed/:orderId" element={
                  <Modal onClose={() => history(-1)} >
                    {!orders?.length && <p>Загружаем данные</p>}
                    {orders?.length && <OrderDetails />}
                  </Modal>
                }
              />
              <Route path="/profile/orders/:orderId" element={
                  <ProtectedRoute element={
                    <Modal onClose={() => history(-1)} >
                      {!orders?.length && <p>Загружаем данные</p>}
                      {orders?.length && <OrderDetails />}
                    </Modal>
                  } />
                }
              />
            </Routes>
          )}
      </main>
      
    </div>
  );
}

export default App;
