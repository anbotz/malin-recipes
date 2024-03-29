const Badges = ({ items }: { items: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((items) => (
        <div key={items} className="badge badge-secondary line-clamp-1">
          {items}
        </div>
      ))}
    </div>
  );
};

export default Badges;
