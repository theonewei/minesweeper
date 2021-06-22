import React from 'react'

//board and the key as props
//flagged = F
//explored = number
//unexplored = ' '

class Tile extends React.Component {
  constructor(props){
    super(props)
    // debugger
    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(e){
    if(e.altKey){
      // console.log('alt')
      this.props.updateGame(this.props.tile,true)
    }else{
      // console.log('click')
      this.props.updateGame(this.props.tile,false)
    }
  }

  printTile(tile){
    if(tile.explored){
      if(tile.bombed){
        return '💣'
      }
      return tile.adjacentBombCount() ? tile.adjacentBombCount() : ' '
    }else if(tile.flagged){
      return '⚑'
    }
    return ' '
    // return tile.adjacentBombCount()
  }

  render(){
    const explored = (this.props.tile.explored ? ' explored' : '')
    return (
    <div className={'tile' + explored} onClick={this.handleClick}>
      {this.printTile(this.props.tile)}
    </div>
    )
  }
  // render(){
  //   return <div>T</div>
  // }
}

export default Tile