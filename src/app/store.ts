import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../modules/counter/counterSlice';
import gridReducer from '../modules/grid/gridSlice';
import undoable from 'redux-undo';

export const store = configureStore({
  reducer: {
    counter: undoable(counterReducer),
    grid: undoable(gridReducer),
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
