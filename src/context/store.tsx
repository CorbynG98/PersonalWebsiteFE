import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { State } from '../models/State';
import { Dispatch } from 'react';
import auth_reducer from './reducers/auth_reducer';

const store: Store<State, any> & { dispatch: Dispatch<AnyAction> } =
  configureStore({
    reducer: auth_reducer,
  });

export { store };
