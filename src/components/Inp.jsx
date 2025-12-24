
export const Inp = ({value, onValueChange, onValueClick}) => {
 
  return (
    <div
      value={value}
      onClick={onValueChange}
      onFocus={(e)=>e.target.select()}
      className="
        w-12 h-12 sm:w-14 sm:h-14
        rounded-md
        text-center text-lg font-bold
        bg-neutral-700 text-white
        border border-neutral-600
        select-none
      "
    >
      {value}
    </div>
  );
};
