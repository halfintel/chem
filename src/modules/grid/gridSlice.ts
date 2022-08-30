import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ModalStateItemInterface } from '../modal/modalSlice';



interface GridStateItemInterface {
  id: number; 
  color: string;
  shortName: string;
  name: string;
  atomicMass: number;
}
export interface GridStateInterface {
  items: Array<Array<GridStateItemInterface>>,
}


let noItemData = {
  id: -1,
  value: '',
  color: 'white',
  shortName: '',
  name: '',
  atomicMass: 0,
};



let rawItemsData = [
  {id: 0, x: 2, y: 4, name: 'Uran', shortName: 'U', atomicMass: 235},
  {id: 2, x: 1, y: 1, name: 'Uran', shortName: 'U', atomicMass: 238},
  {id: 3, x: 3, y: 3, name: 'Oxygen', shortName: 'O', atomicMass: 15.999},
];

let items:Array<Array<GridStateItemInterface>> = [];
for (let x = 0; x < 30; x++){
  items[x] = [];
  for (let y = 0; y < 30; y++){
    items[x][y] = {...noItemData};
  }
}
for (let key in rawItemsData){
  let item = rawItemsData[key];
  items[item.x][item.y] = {id: item.id, color: 'red', name: item.name, shortName: item.shortName, atomicMass: item.atomicMass};
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
      let saveData = {...noItemData, column: -1, row: -1};
      for (let key in payload.fields){
        let field:ModalStateItemInterface = payload.fields[key];
        let name = field.name;
        let value = field.value;
        
        switch(name) {
          case 'id':
            saveData.id = parseInt(value);
            break;
          case 'column':
            saveData.column = parseInt(value);
            break;
          case 'row':
            saveData.row = parseInt(value);
            break;
          
          case 'color':
            saveData.color = value;
            break;
          case 'shortName':
            saveData.shortName = value;
            break;
          case 'name':
            saveData.name = value;
            break;
          case 'atomicMass':
            saveData.atomicMass = parseInt(value);
            break;
        }
      }
      
      state.items[saveData.row][saveData.column] = {
        id: 5,
        color: saveData.color,
        shortName: saveData.shortName,
        name: saveData.name,
        atomicMass: saveData.atomicMass,
      };
    },
  },
});



export const { gridModalSaveClick } = gridSlice.actions;
export const getItems = (state: RootState) => state.grid.present.items;
export default gridSlice.reducer;
