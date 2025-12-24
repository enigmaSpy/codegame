import { Fragment, useState } from "react";
import { Guesser } from "./components/Guesser";
import { Inp } from "./components/inp";

const getRandom = () => {
  return Math.floor(Math.random() * 10);
};
const generateSecret = () =>
  Array.from({ length: 3 }, () => Array.from({ length: 3 }, getRandom));
const initBoard = () => Array.from({ length: 3 }, () => Array(3).fill(0));
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'][Math.floor(Math.random() * 6)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute w-3 h-3 ${piece.color} rounded-sm animate-fall`}
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
function App() {
  const [isWin, setIsWin] = useState(false);
  const [secret, setSecret] = useState(() => generateSecret());
  const [attempts, setAttempts] = useState(10);
  const [checkHits, setCheckHits] = useState(null);
  const [hits, setHits] = useState(() => initBoard());
  const resetGame = () => {
    setSecret(generateSecret());
    setCheckHits(null);
    setHits(() => initBoard());
    setAttempts(10);
    setIsWin(false);
  };

  const checkWin = () => {
    setCheckHits(hits);
    const won = hits.every((row, rowIndex) =>
      row.every((value, colIndex) => secret[rowIndex][colIndex] === value)
    );
    if (won) {
      setIsWin(true);
    } else {
      if (attempts > 1) {
        setAttempts((prev) => prev - 1);
      } else {
        resetGame();
      }
    }
  };

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
      hit.map((colValue, colIndex) =>
        vrow === rowIndex && vcol === colIndex ? value : colValue
      )
    );
    setHits(shallowHit);
    console.log(secret);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
    {isWin && (
        <>
          <Confetti />
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl font-bold text-white mb-8 animate-bounce">
                100
              </div>
              <div className="text-3xl font-semibold text-white mb-6">
                🎉 Gratulacje! 🎉
              </div>
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-lg transition text-lg"
              >
                Zagraj ponownie
              </button>
            </div>
          </div>
        </>
      )}
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
                  matches={
                    checkHits
                      ? countMatches(secret[rowIndex], checkHits[rowIndex])
                      : 0
                  }
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
