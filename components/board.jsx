import React from 'react'
import Tile from './tile'

class Board extends React.Component {
  constructor(props){
    super(props)
  }
      
  renderRow(row,i){
    return(
      row.map((el,j)=>{
        return (
          <Tile tile={el} updateGame={this.props.updateGame} key={`${[i,j]}`}/>)
        
      })
    )
  }

  renderGrid(){
    const grid = this.props.board.grid.map((row,i)=>{
      return(
        <li key={`row-${i}`}>
          {this.renderRow(row,i)}
        </li>
      )
    })
    return grid
  }

  render(){
    return(
      <ul className='board-grid'>
        {this.renderGrid()}
      </ul>
    )
  }
}

export default Board