import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

import { getCookie } from '../../utils/cookie';

type TProtectedRoute = {
  element: ReactElement;
  isAuthPage?: boolean;
  accessFrom?: string;
}

const ProtectedRoute: FC<TProtectedRoute> = ({element, isAuthPage, accessFrom}) => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('token');
  const { isAuthSuccess, isUserLoaded } = useSelector(state => state.user);

  const location = useLocation();
  const { from } = location?.state || { from: {pathname: '/'}}

  if (!isUserLoaded && (accessToken || refreshToken)) {
    return <p>Загрузка</p>
  }

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