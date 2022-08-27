import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


interface GridStateItem {
  id: number; value: string; color: string;
}

export interface GridState {
  items: Array<Array<GridStateItem>>
}


let rawItemsData = [
  {id: 0, x: 2, y: 4},
  {id: 2, x: 1, y: 1},
  {id: 3, x: 3, y: 3},
];

let items:Array<Array<GridStateItem>> = [];
for (let x = 0; x < 10; x++){
  items[x] = [];
  for (let y = 0; y < 10; y++){
    items[x][y] = {id: -1, value: x + '-' + y, color: 'grey'};
  }
}
for (let key in rawItemsData){
  let x = rawItemsData[key].x;
  let y = rawItemsData[key].y;
  let id = rawItemsData[key].id;

  items[x][y] = {id: id, value: x + '-' + y, color: 'red'};
}





const initialState: GridState = {
  items: items,
};


export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    gridClick: (state, data) => {
      let payload = data.payload;
      state.items[payload.row][payload.column].color = 'red';
    },
  },

});

export const { gridClick } = gridSlice.actions;

export const getItems = (state: RootState) => state.grid.present.items;



export default gridSlice.reducer;
