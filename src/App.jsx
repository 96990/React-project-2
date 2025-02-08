
import { useState } from "react";
import Player  from "./components/Player";
import GameBoard  from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS ={
  X: 'Player 1',
  O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for(const turn of gameTurns){
      const {square, player } = turn;
      const {row, col } = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if( firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  // we don't need two state for realising the active player we can deside from the gameturns there for code modified
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayersNameChange(symbol, newName){
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]:newName
      };
    });
  }
  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X'? 'O' : 'X');
    setGameTurns((prevTurns) => {

      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns
      ];

      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayersNameChange}
            />
          <Player 
            initialName={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayersNameChange}
            />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} activePlayerSymbol={activePlayer} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
