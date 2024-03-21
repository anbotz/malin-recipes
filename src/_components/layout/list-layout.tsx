export const ListLayout = ({
  items,
  title,
  noContent,
}: {
  items: any[];
  title: string;
  noContent: string;
}) => {
  return (
    <>
      <h3>{title}</h3>
      <div className="divider" />
      <div>
        {items.length > 0 ? (
          items.map((item) => (
            <div className="flex gap-3" key={item}>
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
