import { Fragment, useState } from "react";
import { Guesser } from "./components/Guesser";
import { Inp } from "./components/inp";

const getRandom = () => {
  return Math.floor(Math.random() * 10);
};
const generateSecret = () =>
  Array.from({ length: 3 }, () => Array.from({ length: 3 }, getRandom));
const initBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function App() {
  const [secret, setSecret] = useState(() => generateSecret());
  const [attempts, setAttempts] = useState(10);
  const [checkHits, setCheckHits] = useState(null);
  const [hits, setHits] = useState(initBoard);
  const resetGame = () => {
    setSecret(generateSecret());
    setCheckHits(null);
    setHits(initBoard);
    setAttempts(10);
  };
  const checkWin = () => {
    setCheckHits(hits);
    const isWin = hits.every((row, rowIndex) =>
      row.every((value, colIndex) => secret[rowIndex][colIndex] === value)
    );
    if (isWin) alert("Wygrana!");
    else {
      if (attempts > 1) {
        setAttempts((prev) => prev - 1);
      } else {
        resetGame();
      }
    }
  };

  const validateInp = (event) => Math.max(0, Math.min(9, parseInt(event) || 0));

  const countMatches = (secretArr, userArr) => {
    const countsSecret = Array(10).fill(0);
    const countUser = Array(10).fill(0);
    secretArr.forEach((item) => {
      countsSecret[item]++;
    });
    userArr.forEach((item) => {
      countUser[item]++;
    });
    let result = 0;
    for (let index = 0; index <= 9; index++) {
      result += Math.min(countUser[index], countsSecret[index]);
    }
    return result;
  };

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
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {hits.map((row, rowIndex) => (
              <Fragment key={`row-group-${rowIndex}`}>
                {row.map((value, colIndex) => {
                  return (
                    <Inp
                      key={`col-group-${rowIndex}-${colIndex}`}
                      onValueChange={() =>
                        updateHit(rowIndex, colIndex, (value + 1) % 10)
                      }
                      value={value}
                    />
                  );
                })}

                <Guesser
                  matches={checkHits?countMatches(secret[rowIndex], checkHits[rowIndex]):0}
                />
              </Fragment>
            ))}

            {[0, 1, 2].map((colIndex) => {
              let matches = 0;
              if (checkHits) {
                const colHits = checkHits.map((row) => row[colIndex]);
                const colSecret = secret.map((row) => row[colIndex]);
                matches = countMatches(colSecret, colHits);
              }
              return <Guesser key={`col-${colIndex}`} matches={matches} />;
            })}
            Próby:{attempts}/10
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
