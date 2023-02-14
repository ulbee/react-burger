import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ProtectedRoute({element, isAuthPage, accessFrom}) {

  const { isAuthSuccess } = useSelector(state => state.user);

  const location = useLocation();
  const { from } = location?.state || { from: {pathname: '/'}}

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