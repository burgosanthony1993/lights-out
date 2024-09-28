import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {


  /*
  Math.round(Math.random()) //a random interger between 0 & 1 (including 0 & 1 are rounded to the nearest interger. 0 represents off. 1 represents on.)
  */
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: .25
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = []; // Step 1: Initialize an empty array to hold the rows of the board.
    
    for (let y = 0; y < this.props.nrows; y++) {  // Step 2: Outer loop for each row (y represents the row index).
      let row = [];  // Step 3: Initialize an empty array for the current row.
      
      for (let x = 0; x < this.props.ncols; x++) {  // Step 4: Inner loop for each cell in the row (x represents the column index).
        // Step 5: Push true or false to the row, based on a random chance.
        row.push(Math.random() < this.props.chanceLightStartsOn); 
      }
  
      board.push(row);  // Step 6: Push the entire row array into the `board` array.
    }
    
    return board;  // Step 7: Return the completed 2D array (board) representing the game grid.
  }
  

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({board});
  }



  //, hasWon

  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++){
      let row = [];
      for (let x = 0; x < this.props.ncols; x++){
        row.push(<Cell key={`${y}-${x}`} isLit={this.state.board[y][x]}/>)
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }
    return (
      <table className="Board">
        <tbody>
        {tblBoard}
        </tbody>
      </table>
    )
    
    // make table board

    // TODO
  }
}


export default Board;
