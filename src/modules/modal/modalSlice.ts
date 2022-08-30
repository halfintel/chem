import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export enum FieldEnum {
  input = 'input',
  textarea = 'textarea',
}

export enum TypeEnum {
  string = 'string',
  number = 'number',
}


export interface ModalStateItemInterface {
  field: FieldEnum,
  type: TypeEnum,
  name: string,
  placeholder: string,
  value: string,
  hidden: boolean,
  required: boolean,
}

export interface ModalStateInterface {
  fields: Array<ModalStateItemInterface>,
  showModal: boolean,
  callback: string,
}





const initialState: ModalStateInterface = {
  fields: [{
    field: FieldEnum.input,
    type: TypeEnum.string,
    name: 'color',
    placeholder: 'Color',
    value: 'red',
    hidden: false,
    required: true,
  }],
  showModal: false,
  callback: '',
};


export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOpen: (state, data) => {
      let payload = data.payload;
      state.fields = payload.fields;
      state.showModal = true;
      state.callback = payload.callback;
    },
    modalSaveClick: (state, data) => {
      state.showModal = false;
    },
    modalCancelClick: (state, data) => {
      state.showModal = false;
    },
    modalInputChange: (state, data) => {
      let payload = data.payload;
      state.fields[payload.key].value = payload.value;
    },
  },

});

export const { modalOpen, modalSaveClick, modalCancelClick, modalInputChange } = modalSlice.actions;
export const getModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
