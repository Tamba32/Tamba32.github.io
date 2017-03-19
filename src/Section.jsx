import React from 'react';

import Table from './Table.jsx';

class Section extends React.Component {
  
  constructor() {
    super();
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleClick();
  }

  render() {
    return (
      <div className="table-like">
        <Table type={this.props.type} table={this.props.content}/>
        <button id={this.props.id} className="button" onClick={this.handleClick}>
          Update {this.props.type}
        </button>
      </div>
    );
  }
}

export default Section;