import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCookie } from '../../utils/methods';
import { getUser } from '../../services/actions/user';

function ProtectedRoute({children, ...rest}) {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const { isUserLoaded } = useSelector( state => state.user);

  useEffect(() => {
    dispatch(getUser(accessToken));
  }, []);

  return (
    <Route
      {...rest}
      render={() =>
        isUserLoaded ? ( children ) : ( <Redirect to='/login'/> )
      }
    />    
  );
}

export default ProtectedRoute;