import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gridReducer from '../modules/grid/gridSlice';
import modalReducer from '../modules/modal/modalSlice';
import undoable from 'redux-undo';


export const store = configureStore({
  reducer: {
    grid: undoable(gridReducer),
    modal: modalReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
