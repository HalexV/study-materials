import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
       
    if (props.statusTile === 1) {
      return (
        <button 
          className="square winnerTiles" 
          onClick={props.onClick}
        >
          {props.value}
        </button>
      );
    } else if (props.statusTile === 2) {
      return (
        <button 
          className="square highlightMove" 
          onClick={props.onClick}
        >
          {props.value}
        </button>
      );
    } else {
      return (
        <button 
          className="square" 
          onClick={props.onClick}
        >
          {props.value}
        </button>
      );
    }

    
    
  }
  
  class Board extends React.Component {
      
    renderSquare(i, statusTile) {
      return (
       <Square 
         value={this.props.squares[i]}
         onClick={() => this.props.onClick(i)}
         statusTile={statusTile}
       />
      );
    }
    
    //It builds the board with two for loops.
    renderRowsAndCols(statusTiles) {
      let counter = 0;//It is used as a parameter to the renderSquare method.
      
      let rows = [];
      let cols;
      let statTiles = [0,0,0,0,0,0,0,0,0];

      if (statusTiles.length === 3) {
        for (let index = 0; index < statusTiles.length; index++) {
          statTiles[statusTiles[index]] = 1;
        }
      } else {
        if (statusTiles.length === 1) {
          for (let index = 0; index < statusTiles.length; index++) {
            statTiles[statusTiles[index]] = 2;
          }
        } 
      }

      

      for (let i = 0; i < 3; i++) {
        cols = [];
        for (let j = 0; j < 3; j++) {
          cols.push(this.renderSquare(counter, statTiles[counter]));
          counter++;
        }

      rows.push(<div className="board-row">{cols}</div>);

      }

      return (rows);

    }
    
    
  
    render() {
      
      return (
        <div>{this.renderRowsAndCols(this.props.statusTiles)}</div>
      );

      /*return (//Old version to construct the board.
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );*/
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          position: [null,null], //To save the position X,Y where it was marked.
        }],
        stepNumber: 0,
        xIsNext: true,
        isAscending: true,//A flag for the type of sorting. Ascending or Descending.
      };
    }

    handleClick(i){

      const history = this.state.history.slice(0, this.state.stepNumber + 1);

      const current = history[history.length - 1];

      const squares = current.squares.slice();
      
      if (calculateWinner(squares)[0] || squares[i]) {
        return;
      }

      let whereClicked; //Hold the actual position where It was clicked on the board.
      
      switch (i) { //It Map the coordinates of the board.
        case 0:
          whereClicked = [1,1];
          break;
        case 1:
          whereClicked = [1,2];
          break;
        case 2:
          whereClicked = [1,3];
          break;
        case 3:
          whereClicked = [2,1];
          break;
        case 4:
          whereClicked = [2,2];
          break;
        case 5:
          whereClicked = [2,3];
          break;
        case 6:
          whereClicked = [3,1];
          break;
        case 7:
          whereClicked = [3,2];
          break;
        case 8:
          whereClicked = [3,3];
          break;          
        default:
          console.log("Error where It was clicked.")
          break;
      }

      whereClicked.push(i);

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          position: whereClicked,//It saving the coordinates.
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo (step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    changeSorting () {//It changes the value of flag.
      this.setState({
        isAscending: !this.state.isAscending,
      });
    }

    render() {
      const history = this.state.history;

      const currentStep = this.state.stepNumber;//Where it currently is on the history list.

      const current = history[this.state.stepNumber];

      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move + ' (' + step.position[0] + ',' + step.position[1] + ')' : 'Go to game start';

        if (currentStep === move) {//Where on the list it is.
          return (//Where in the history the match is.
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
            </li>
          );
        } else {
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        }
      })
      
      //This block change the sorting of the moves array from ascending to descending and vice-versa.
      let sortButton;
      if (this.state.isAscending) {
        sortButton = (<button onClick={() => {this.changeSorting()}}>Sorted: Ascending</button>);
        
      } else {
        sortButton = (<button onClick={() => {this.changeSorting()}}>Sorted: Descending</button>);

        moves.reverse();
      }

      let status;

      if (winner[0]) {
        status = 'Winner: ' + winner[0];
      } else {
        if (this.state.stepNumber === 9) {
          status = "It's a draw!";
          winner[1] = [current.position[2]];
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
          winner[1] = [current.position[2]];
        }
        
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
              statusTiles = {winner[1]}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>{sortButton}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  //background color: #50ec50;
  
  // ========================================
  
  /*
  ---Challenge TODO---
  From: https://reactjs.org/tutorial/tutorial.html.
  "If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:

  - (COMPLETED) Display the location for each move in the format (col, row) in the move history list.
  - (COMPLETED) Bold the currently selected item in the move list.
  - (COMPLETED) Rewrite Board to use two loops to make the squares instead of hardcoding them.
  - (COMPLETED) Add a toggle button that lets you sort the moves in either ascending or descending order.
  - (COMPLETED) When someone wins, highlight the three squares that caused the win.
  - (COMPLETED) When no one wins, display a message about the result being a draw."
  */

  /*
  ---Custom Challenge TODO---
  - (COMPLETED) Highlight where the move was made.
  */

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a],[a,b,c]];
      }
    }
    return [null, []];
  }