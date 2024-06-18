import { combineReducers } from '@reduxjs/toolkit';
import session from './session/reducer/index';

export function createReducer() {
  return combineReducers({
    session,
  });
}
