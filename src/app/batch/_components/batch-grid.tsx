import BatchCard from "./batch-card";

const BatchGrid = ({ days, batch }: { days: string[]; batch: string[] }) => {
  return (
    <div
      className={`flex-1 grid grid-cols-1 lg:grid-cols-5 gap-2 w-full place-items-center`}
    >
      {days.length > 0 &&
        days.map((a, index) => (
          <BatchCard
            recipeId={batch[index]}
            day={a}
            key={a}
            recipeIndex={index}
          />
        ))}
    </div>
  );
};

export default BatchGrid;
