import React from "react";

export const PageLayoutComponent = ({
  title,
  children,
  buttons,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  buttons?: React.ReactNode;
}) => {
  // FIXME H2 moche
  return (
    <div className="flex flex-col m-3 flex-1">
      <div className="flex items-center justify-between mb-3">
        <h2 className="mb-3">{title}</h2>
        <div className="grow" />
        <div>{buttons}</div>
      </div>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
