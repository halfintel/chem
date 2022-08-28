import appStyles from '../../App.module.css';
import styles from './Grid.module.css';
import { getItems } from './gridSlice';
import { modalOpen, FieldEnum, TypeEnum } from '../modal/modalSlice';
import Modal from '../modal/Modal';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ActionCreators } from 'redux-undo';


function Grid() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getItems);


  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <button
          className={appStyles.button + ' ' + appStyles.br + ' ' + styles.button}
          aria-label="Undo value"
          onClick={() => dispatch(ActionCreators.undo())}
        >
          Undo
        </button>
        <button
          className={appStyles.button + ' ' + appStyles.br + ' ' + styles.button}
          aria-label="Redo value"
          onClick={() => dispatch(ActionCreators.redo())}
        >
          Redo
        </button>
      </div>
      <div className={styles.table}>
        {Object.entries(items).map(([rowIndex, row]) => {
          return (<div className={styles.tr} key={rowIndex}>
            {Object.entries(row).map(([columnIndex, item]) => {
              let key = rowIndex + '-' + columnIndex;
              return <div className={styles.item} style={{backgroundColor: item.color}} key={key} onClick={() => dispatch(modalOpen(
                  {
                    fields: [
                      {field: FieldEnum.input, type: TypeEnum.string, required: true, name: 'shortName', placeholder: 'Short name', value: item.shortName, hidden: false},
                      {field: FieldEnum.input, type: TypeEnum.string, required: true, name: 'name', placeholder: 'Name', value: item.name, hidden: false},
                      {field: FieldEnum.input, type: TypeEnum.number, required: true, name: 'atomicMass', placeholder: 'Atomic mass', value: item.atomicMass, hidden: false},
                      {field: FieldEnum.input, type: TypeEnum.string, required: true, name: 'color', placeholder: 'Color', value: item.color, hidden: false},
                      {field: FieldEnum.input, type: TypeEnum.string, required: true, name: 'row', placeholder: 'row', value: rowIndex, hidden: true},
                      {field: FieldEnum.input, type: TypeEnum.string, required: true, name: 'column', placeholder: 'column', value: columnIndex, hidden: true},
                    ],
                    callback: 'grid/gridModalSaveClick'
                  }
              ))} >
                {item.id !== -1 ? (
                  <div className={styles.itemParamsWrapper}>
                    <span className={styles.itemShortName}>{item.shortName}</span>
                    <span>{item.name}</span>
                    <span>{item.atomicMass}</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>;
            })}
          </div>);
        })}
      </div>

      <Modal />
    </div>
  );
}

export default Grid;
