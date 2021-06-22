import React from 'react'
import Board from './board'
import * as Minesweeper from '../minesweeper'

class Game extends React.Component{
  constructor(props){
    super(props)
    let board = new Minesweeper.Board(9,13)
    this.state = {
      board: board,
      size: 9,
      numBombs: 13,
      numBombsLeft: 13
    }
    this.updateGame = this.updateGame.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.updateSize = this.updateSize.bind(this)
    this.updateNumBombs = this.updateNumBombs.bind(this)
  }

  updateGame(tile,flagging){
    if(flagging){
      tile.toggleFlag()
      if(tile.flagged){
        this.setState({board: this.state.board,numBombsLeft: this.state.numBombsLeft-1})
      }else{
        this.setState({board: this.state.board,numBombsLeft: this.state.numBombsLeft+1})
      }
      
    }else{
      tile.explore()
      this.setState({board: this.state.board})
    }
  }

  updateSize(e){
    this.setState({
      size: e.target.value
    })
  }
  
  updateNumBombs(e){
    this.setState({
      numBombs: e.target.value,
      numBombsLeft: e.target.value
    })
  }

  resetGame(){
    this.setState({
      board: new Minesweeper.Board(this.state.size,this.state.numBombs)})
  }

  checkOver(){
    if(this.state.board.lost()){
      this.gameOver()
      return 'Game Over'
    }else if(this.state.board.won()){
      return 'Congratulations'
    }
    return ''
  }

  gameOver(){
    for(let row of this.state.board.grid){
        for(let tile of row){
            tile.explored = true
      }
    }
  }
 
  
  render(){
    const message = this.checkOver()
    const modal = ()=>{
      if(message){
        return (
          <div>
            <div className='modal-screen'></div>
            <div className='modal-form'>
              <p>{message}</p>
              <button className='button' onClick={this.resetGame}>Reset Game</button>
            </div>
          </div>
        )
      }
      return
    }

    return (
      <div className='game'>
        <h1 className='title'>MINESWEEPER</h1>
        <br />
        <h1 className='instructions'>Explore tiles with right click</h1>
        <h1 className='instructions'>Flag tiles with right click + alt</h1>

        <Board board={this.state.board} updateGame={this.updateGame}/>

        <br />
        <h1>Bombs Left: {this.state.numBombsLeft}</h1>

        <div className='board-adjust'>
          <div className='adjust-label'>
            <label> Size           :</label><br />
            <label> Number of Bombs:</label>
          </div>
          <div className='adjust-input'>
            <input type="text" value={this.state.size} onChange={this.updateSize}/>
            <input type="text" value={this.state.numBombs} onChange={this.updateNumBombs}/>
          </div>
          <br />
          <button className='button' onClick={this.resetGame}>Reset Game</button>
        </div>

        <div>
          {modal()}
        </div>
      </div>
    )
  }
}

export default Game
