import React from 'react';

class Table extends React.Component {
  
  get headerColumns() {
    if (!this.props.table.length) return;
    return Object.keys(this.props.table[0]).map((cell, i) => (
      <div key={i} className="header-cell cell" data-col={cell}>
        {cell === 'stargazers_count' ? 'stars' : cell}
      </div>
    ));
  }

  get bodyRows() {
    if (!this.props.table.length) return;
    return this.props.table.map((row, i) => (
      <div key={i} className="body-row">
        {Object.keys(row).map((cell, i) => {
          if (cell === 'avatar') {
            return (
              <div data-col={cell} className="row-cell cell">
                <img src={row[cell]}  alt="avatar"/>
              </div>
            );
          } else return <div className="row-cell cell" data-col={cell}>{row[cell]}</div>;
        })} 
      </div>
    ));
  }
  
  render() {
    return (
      <div>
        <div className="header">
          {this.props.type === 'Users' ? 'Most Active Users' : 'Most Starred Repositories'}
        </div>
        <div className="header-row">
          {this.headerColumns}
        </div>
        <div>
          {this.bodyRows}
        </div>
      </div>
    );
  }
}

export default Table;