import { useState } from "react";

type Square = "X" | "O" | null;

const INITIAL_SQUARES: Square[] = Array(9).fill(null);

const WINNING_COMBINATIONS = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: Square[]) {
  for (const combination of WINNING_COMBINATIONS) {
    const [x, y, z] = combination;

    if (squares[x] === squares[y] && squares[x] === squares[z]) {
      return squares[x];
    }
  }

  return null;
}

function calculateCurrentPlayer(squares: Square[]) {
  const checkedSquares = squares.filter(Boolean);
  const isEven = checkedSquares.length % 2 === 0;
  return isEven ? "X" : "O";
}

function calculateStatus(
  squares: Square[],
  winner: Square,
  currentPlayer: "X" | "O",
) {
  return winner
    ? `Winner is Player ${winner}`
    : squares.every(Boolean)
      ? "Game over! It's a draw!"
      : `Player ${currentPlayer}'s turn`;
}

export default function App() {
  const [squares, setSquares] = useState<Square[]>(INITIAL_SQUARES);

  const winner = calculateWinner(squares);
  const currentPlayer = calculateCurrentPlayer(squares);
  const status = calculateStatus(squares, winner, currentPlayer);

  function handleChange(id: number) {
    const newSquares = squares.map((square, index) => {
      if (index !== id) return square;
      return currentPlayer;
    });
    setSquares(newSquares);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-lvh gap-8">
      <h1 className="text-3xl font-bold">tic-tac-toe</h1>
      <main className="flex flex-col justify-center items-center gap-4">
        <span className="text-lg"> {status}</span>
        <ul className="grid grid-cols-3 grid-rows-3 gap-1">
          {squares.map((square, index) => (
            <li key={index}>
              <label
                className="flex items-center justify-center border border-gray-700 w-24 h-24 text-4xl"
                htmlFor={`square-${index}-checkbox`}
              >
                {square}
              </label>
              <input
                hidden
                id={`square-${index}-checkbox`}
                type="checkbox"
                checked={Boolean(square)}
                onChange={() => handleChange(index)}
                disabled={Boolean(winner) || Boolean(square)}
              />
            </li>
          ))}
        </ul>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-md"
          onClick={() => setSquares(INITIAL_SQUARES)}
        >
          restart
        </button>
      </main>
    </div>
  );
}
