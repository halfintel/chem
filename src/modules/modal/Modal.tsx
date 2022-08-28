import appStyles from '../../App.module.css';
import styles from './Modal.module.css';
import {
  getModal,
  modalSaveClick,
  modalCancelClick,
  modalInputChange,
} from './modalSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';


function Modal() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(getModal);

  

  return (
    <div className="Modal">
      <header className="Modal-header">
        {modal.showModal ? (
          <div className={styles.modalWrapper}>
            <div className={styles.modal}>
              {Object.entries(modal.fields).map(([fieldIndex, field]) => {
                let hidden = field.hidden ? appStyles.hidden : '';
                return (<input className={hidden} name={field.name} value={field.value} key={fieldIndex} onChange={(event) => dispatch(modalInputChange({key: fieldIndex, value: event.target.value}))} />);
              })}
              <button
                className={appStyles.button}
                aria-label="Cancel"
                onClick={() => dispatch(modalCancelClick(modal))}
              >
                Cancel
              </button>
              <button
                className={appStyles.button}
                aria-label="Save"
                onClick={() => {
                  dispatch(modalSaveClick(modal));
                  if (modal.callback){
                    dispatch({type: modal.callback, payload: modal});
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </header>
    </div>
  );
}

export default Modal;
