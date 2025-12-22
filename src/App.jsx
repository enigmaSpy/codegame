import { useState } from "react";
import { Guesser } from "./components/Guesser";
import { Inp } from "./components/inp";

const getRandom = () => {
  return Math.floor(Math.random() * 10);
};
const secret = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, getRandom)
);
function App() {
  
  const [hits, setHits] = useState([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);
  const checkWin = () => {
    const isWin = hits.every((row, rowIndex) =>
      row.every((value, colIndex) => secret[rowIndex][colIndex] === value)
    );
    if (isWin) alert("Wygrana!");
  };

  const validateInp = (event) => Math.max(0, Math.min(9, parseInt(event) || 0));
  const updateHit = (vrow, vcol, value) => {
    const shallowHit = hits.map((hit, rowIndex) =>
      vrow !== rowIndex
        ? hit
        : hit.map((colValue, colIndex) =>
            vcol !== colIndex ? colValue : validateInp(value)
          )
    );
    console.log(shallowHit);
    setHits(shallowHit);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div>
        <div className="bg-neutral-800 p-6 rounded-xl shadow-lg flex">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {hits.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <Inp
                  key={`${rowIndex}-${colIndex}`}
                  onValueChange={(e) =>
                    updateHit(rowIndex, colIndex, e.target.value)
                  }
                  value={value}
                />
              ))
            )}

            <Guesser />
            <Guesser />
            <Guesser />
          </div>
          <div>
            <Guesser />
            <Guesser />
            <Guesser />
          </div>
        </div>
        <button
          onClick={checkWin}
          className="
          mt-6 w-full
          rounded-lg
          bg-amber-400 hover:bg-amber-300
          text-black font-semibold
          py-2
          transition
        "
        >
          Sprawdź
        </button>
      </div>
    </div>
  );
}

export default App;
