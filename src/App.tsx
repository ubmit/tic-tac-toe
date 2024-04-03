export default function App() {
  const squares = Array.from({ length: 9 }, () => ({ checked: false }));

  return (
    <div className="flex justify-center flex-col items-center min-h-lvh gap-8">
      <h1 className="text-3xl font-bold">tic-tac-toe</h1>
      <span className="text-lg">Player X's turn</span>
      <span className="text-lg">Winner is Player X</span>
      <main>
        <ul className="grid grid-cols-3 grid-rows-3 gap-1">
          {squares.map((_, index) => (
            <li key={index}>
              <input type="checkbox" className="w-8 h-8" />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
