import {
  AnyAction, applyMiddleware,
  configureStore, Store
} from '@reduxjs/toolkit';
import { State } from '@src/models/State';
import { Dispatch } from 'react';
import thunkMiddleware from 'redux-thunk';
import auth_reducer from './reducers/auth_reducer';

const thunkComposer = applyMiddleware(thunkMiddleware);

const store: Store<State, any> & { dispatch: Dispatch<AnyAction> } =
  configureStore({
    reducer: auth_reducer,
  });

export { store };

