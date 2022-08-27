import styles from './Grid.module.css';
import {
  gridClick,
  getItems
} from './gridSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ActionCreators } from 'redux-undo';





function Grid() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getItems);

  return (
    <div className="Grid">
      <header className="Grid-header">
        <button
          className={styles.button}
          aria-label="Undo value"
          onClick={() => dispatch(ActionCreators.undo())}
        >
          Undo
        </button>
        <button
          className={styles.button}
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
                  let id = item.id;
                  let value = item.value;
                  let color = item.color;
                  return <td className={styles.item + " " + styles[color]} key={value} onClick={() => dispatch(gridClick({row: rowIndex, column: columnIndex}))} >{value}</td>;
                })}
              </tr>);
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Grid;
