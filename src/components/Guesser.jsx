export const Guesser = ({matches}) => {
  return (
    <div className=" 
    flex justify-center items-center 
    w-12 h-12 sm:w-14 sm:h-14 
    text-lg font-bold text-white">
      {matches||0}
    </div>
  );
};
