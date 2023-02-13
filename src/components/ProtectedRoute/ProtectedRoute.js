import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../services/actions/user';

function ProtectedRoute({element, isAuthPage}) {
  const dispatch = useDispatch();

  const { isAuthSuccess } = useSelector(state => state.user);

  const location = useLocation();
  const { from } = location?.state || { from: {pathname: '/'}}

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isAuthPage && isAuthSuccess) {
    return <Navigate to={from} />;
  }

  // if (isAuthPage && !isAuthSuccess && location.pathname === '/reset-password') {
  //   if (from !== '/forgot-password') {
  //     return <Navigate to='/forgot-password' />;
  //   }
  // }

  if (!isAuthPage && !isAuthSuccess) {
    return <Navigate to="/login" replace state={ {from: location} }/>;
  }

  return element;
}

export default ProtectedRoute;