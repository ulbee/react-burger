import { 
  TypedUseSelectorHook, 
  useSelector as selectorHook, 
  useDispatch as dispatchHook
} from 'react-redux';
import { AppDispatch, AppThunk } from './types/index';
import { TRootState } from './types';

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>(); 
