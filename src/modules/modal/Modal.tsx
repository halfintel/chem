import appStyles from '../../App.module.css';
import styles from './Modal.module.css';
import {
  getModal,
  modalSaveClick,
  modalCancelClick,
  modalInputChange,
} from './modalSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CirclePicker } from 'react-color';


function Modal() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(getModal);
  

  return (
    <div className="Modal">
      <header className="Modal-header">
        {modal.showModal ? (
          <div className={styles.modalWrapper}>
            <form className={styles.modal + ' ' + appStyles.br}
              onSubmit={() => {
                  dispatch(modalSaveClick(modal));
                  if (modal.callback){
                    dispatch({type: modal.callback, payload: modal});
                  }
                }}
            >
              {Object.entries(modal.fields).map(([fieldIndex, field]) => {
                let hidden = field.hidden ? appStyles.hidden : '';
                let hiddenInput = field.name === 'color' ? appStyles.hidden : '';
                
                return (
                  <div key={fieldIndex} className={hidden + ' ' + styles.inputWrapper}>
                    <input 
                      type={field.type} 
                      className={hiddenInput + ' ' + appStyles.input + ' ' + appStyles.br + ' ' + styles.input} 
                      name={field.name} 
                      placeholder={field.placeholder}
                      value={field.value} 
                       
                      required={field.required} 
                      onChange={(event) => dispatch(modalInputChange({key: fieldIndex, value: event.target.value}))} 
                    />
                    {field.name === 'color' ? (
                      <CirclePicker 
                        color={field.value} 
                        onChangeComplete={(color) => dispatch(modalInputChange({key: fieldIndex, value: color.hex}))}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}


              <div className={styles.buttons}>
                <button
                  className={appStyles.button + ' ' + appStyles.br}
                  aria-label="Cancel"
                  type='button'
                  onClick={() => dispatch(modalCancelClick(modal))}
                >
                  Cancel
                </button>
                <button
                  className={appStyles.button + ' ' + appStyles.br}
                  aria-label="Save"
                  type='submit'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div></div>
        )}
      </header>
    </div>
  );
}

export default Modal;
