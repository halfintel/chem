import appStyles from '../../App.module.css';
import styles from './Grid.module.css';
import { getItems } from './gridSlice';
import { modalOpen } from '../modal/modalSlice';
import Modal from '../modal/Modal';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ActionCreators } from 'redux-undo';


function Grid() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getItems);


  return (
    <div className="Grid">
      <header className="Grid-header">
        <button
          className={appStyles.button}
          aria-label="Undo value"
          onClick={() => dispatch(ActionCreators.undo())}
        >
          Undo
        </button>
        <button
          className={appStyles.button}
          aria-label="Redo value"
          onClick={() => dispatch(ActionCreators.redo())}
        >
          Redo
        </button>
        <table className={styles.table}>
          <tbody>
            {Object.entries(items).map(([rowIndex, row]) => {
              return (<tr key={rowIndex}>
                {Object.entries(row).map(([columnIndex, item]) => {
                  let value = item.value;
                  let color = item.color;
                  return <td className={styles.item + " " + styles[color]} key={value} onClick={() => dispatch(modalOpen(
                      {
                        fields: [
                          {type: 'input', name: 'row', value: rowIndex, hidden: true},
                          {type: 'input', name: 'column', value: columnIndex, hidden: true},
                          {type: 'input', name: 'color', value: color, hidden: false},
                        ],
                        callback: 'grid/gridModalSaveClick'
                      }
                  ))} >{value}</td>;
                })}
              </tr>);
            })}
          </tbody>
        </table>

        <Modal />
      </header>
    </div>
  );
}

export default Grid;
