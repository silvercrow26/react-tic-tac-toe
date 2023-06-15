import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWiner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { Turns } from "./components/Turns";
import { resetGameStorage, saveGameToStorage } from "./logic/storage";

function App() {
  //Los estados no se deben mutar directamente o pueden ocurrir discrepancias a la hora del render
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); //null si no hay ganador, false si hay ganador

  const updateBoard = (index) => {
    if (board[index]) return;
    const updateBoard = [...board]
    updateBoard[index] = turn
    setBoard(updateBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn);

    saveGameToStorage({
      board: updateBoard,
      turn: newTurn,
    })

    const newWinner = checkWiner(updateBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(updateBoard)) {
      setWinner(false);
    }
  }
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  }

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className="game">
        {board.map((row, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>{row}</Square>
          )
        })}
      </section>
      <Turns turn={turn} />
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}
export default App
