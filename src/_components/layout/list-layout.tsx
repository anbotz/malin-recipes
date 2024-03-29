import { v4 } from "uuid";

export const ListLayout = ({
  items,
  title,
  noContent,
  isGrid,
}: {
  items: any[];
  title: string;
  noContent: string;
  isGrid?: boolean;
}) => {
  return (
    <>
      <h3>{title}</h3>
      <div className="divider" />
      <div
        className={`${
          isGrid
            ? "grid grid-cols-1 gap-3 lg:grid-cols-2"
            : "flex flex-col gap-3"
        }`}
      >
        {items.length > 0 ? (
          items.map((item) => (
            <div className="flex gap-3 line-clamp-1" key={v4()}>
              <input type="checkbox" className="checkbox" />
              {item}
            </div>
          ))
        ) : (
          <>{noContent}</>
        )}
      </div>
      <div className="divider" />
    </>
  );
};
