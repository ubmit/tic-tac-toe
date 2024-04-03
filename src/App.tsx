import { useEffect, useState } from "react";

const PLAYER = {
  X: "X",
  O: "O",
} as const;

type Player = (typeof PLAYER)[keyof typeof PLAYER];

type Square = {
  id: number;
  player: Player | null;
};

const INITIAL_SQUARES: Square[] = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  player: null,
}));

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

function checkWinner(squares: Square[]) {
  for (const combination of WINNING_COMBINATIONS) {
    const [x, y, z] = combination;

    if (
      squares[x].player === squares[y].player &&
      squares[x].player === squares[z].player
    ) {
      return squares[x].player;
    }
  }

  return null;
}

export default function App() {
  const [squares, setSquares] = useState<Square[]>(INITIAL_SQUARES);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(PLAYER.X);
  const [winner, setWinner] = useState<Player | null>(null);

  function handleChange(id: number) {
    const newSquares = squares.map((square) => {
      if (square.id !== id) return square;
      return {
        ...square,
        player: currentPlayer,
      };
    });
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === PLAYER.X ? PLAYER.O : PLAYER.X);
  }

  useEffect(() => {
    setWinner(checkWinner(squares));

    if (squares.every(({ player }) => Boolean(player))) {
      alert("Game over");
    }
  }, [squares]);

  return (
    <div className="flex justify-center flex-col items-center min-h-lvh gap-8">
      <h1 className="text-3xl font-bold">tic-tac-toe</h1>
      {winner ? (
        <span className="text-lg"> {`Winner is Player ${winner}`}</span>
      ) : (
        <span className="text-lg">Player {currentPlayer}'s turn</span>
      )}
      <main>
        <ul className="grid grid-cols-3 grid-rows-3 gap-1">
          {squares.map(({ id, player }) => (
            <li key={id}>
              <input
                type="checkbox"
                checked={Boolean(player)}
                onChange={() => handleChange(id)}
                disabled={Boolean(player)}
              />
              <div className="border border-gray-700 w-8 h-8">{player}</div>
            </li>
          ))}
        </ul>
        <button
          className="bg-gray-600 text-white px-4 py-2 mt-4 rounded-md"
          onClick={() => setSquares(INITIAL_SQUARES)}
        >
          reset
        </button>
      </main>
    </div>
  );
}
