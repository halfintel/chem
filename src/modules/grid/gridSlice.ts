import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ModalStateItemInterface } from '../modal/modalSlice';



interface GridStateItemInterface {
  id: number; value: string; color: string;
}
export interface GridStateInterface {
  items: Array<Array<GridStateItemInterface>>,
}


let rawItemsData = [
  {id: 0, x: 2, y: 4},
  {id: 2, x: 1, y: 1},
  {id: 3, x: 3, y: 3},
];

let items:Array<Array<GridStateItemInterface>> = [];
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





const initialState: GridStateInterface = {
  items: items,
};


export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    gridModalSaveClick: (state, data) => {
      let payload = data.payload;
      let saveData = {
        column: -1,
        row: -1,
        color: 'grey',
      };
      for (let key in payload.fields){
        let field:ModalStateItemInterface = payload.fields[key];
        let name = field.name;
        let value = field.value;
        
        switch(name) {
          case 'column':
            saveData.column = parseInt(value);
            break;
          case 'row':
            saveData.row = parseInt(value);
            break;
          case 'color':
            saveData.color = value;
            break;
        }
      }
      state.items[saveData.row][saveData.column].color = saveData.color;
    },
  },
});



export const { gridModalSaveClick } = gridSlice.actions;
export const getItems = (state: RootState) => state.grid.present.items;
export default gridSlice.reducer;
