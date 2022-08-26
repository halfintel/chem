import './Grid.css';

let items = [
  [
    {value: '1-1', color: 'blue'},
    {value: '1-2', color: 'blue'},
  ],
  [
    {value: '2-1', color: 'grey'},
    {value: '2-2', color: 'grey'},
  ],

];




function Grid() {
  return (
    <div className="Grid">
      <header className="Grid-header">
        <table>
          <tbody>
            {Object.entries(items).map(([index1, row]) => {
              return (<tr key={index1}>
                {Object.entries(row).map(([index2, item]) => {
                  let id = item.value;
                  let color = item.color;
                  return <td className={"item " + color} key={id} />;
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
