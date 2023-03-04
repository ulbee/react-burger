import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

function ProtectedRoute({element, isAuthPage, accessFrom}) {

  const { isAuthSuccess, isUserLoaded } = useSelector(state => state.user);

  const location = useLocation();
  const { from } = location?.state || { from: {pathname: '/'}}

  if (!isUserLoaded) {
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

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  isAuthPage: PropTypes.bool,
  accessFrom: PropTypes.string
}

export default ProtectedRoute;