import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCookie } from '../../utils/cookie';
import { getUser } from '../../services/actions/user';

function ProtectedRoute({element, isAuthPage}) {
  console.log('ProtectedRoute');
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const { isUserLoaded } = useSelector(state => state.user);

  const {location} = useLocation();

  useEffect(() => {
    dispatch(getUser(accessToken));
  }, [dispatch, accessToken]);

  if (isAuthPage && isUserLoaded) {
    const { from } = location?.state || { from: {pathname: '/'}}
    return <Navigate to={from} />;
  }

  if (!isAuthPage && !isUserLoaded) {
    return <Navigate to="/login" replace state={ {from: location} }/>;
  }

  return element;
}

export default ProtectedRoute;