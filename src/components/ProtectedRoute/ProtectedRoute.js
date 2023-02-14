import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../services/actions/user';

function ProtectedRoute({element, isAuthPage, accessFrom}) {
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

  if (isAuthPage && !isAuthSuccess && accessFrom && from.pathname !== accessFrom) {
    return <Navigate to={accessFrom} replace/>;
  }

  if (!isAuthPage && !isAuthSuccess) {
    return <Navigate to="/login" replace state={ {from: location} }/>;
  }

  return element;
}

export default ProtectedRoute;