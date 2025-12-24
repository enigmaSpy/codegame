export const Guesser = ({ matches }) => {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14   flex items-center justify-center">
      <div className="flex gap-0.5">
        {[...Array(matches)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};