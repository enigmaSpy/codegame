
export const Inp = ({value, onValueChange, onValueClick}) => {
 
  return (
    <input
      type="number"
      min="0"
      max="9"
      value={value}
      onChange={onValueChange}
      onFocus={(e)=>e.target.select()}
      className="
        w-12 h-12 sm:w-14 sm:h-14
        rounded-md
        text-center text-lg font-bold
        bg-neutral-700 text-white
        border border-neutral-600
        focus:outline-none focus:ring-2 focus:ring-amber-400
      "
    />
  );
};
