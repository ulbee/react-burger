import { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCookie } from '../../utils/cookie';
import { getUser } from '../../services/actions/user';

function ProtectedRoute({children, ...rest}) {
  console.log('ProtectedRoute');
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const { isUserLoaded } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUser(accessToken));
  }, [dispatch, accessToken]);

  return (
    <>
      {console.log('RRR', isUserLoaded)}
      {isUserLoaded ? <Route {...rest} render={() => (children)}/> : <Navigate to='/login'/>}
    </>
    // <Route
    //   {...rest}
    //   render={() =>
    //     isUserLoaded ? ( children ) : ( <Redirect to='/login'/> )
    //   }
    // />    
  );
}

export default ProtectedRoute;