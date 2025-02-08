// import { useState } from "react"

export default function GameBoard({onSelectSquare, board, activePlayerSymbol}){
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    /**
     * overrided the below function because we need the same state in the log file also to move to one
     * level up to app component.
     */
    // function handleSelectSqure(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(initialArray => [...initialArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard
    //     });

    //     onSelectSquare();
    // }

    return(
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}