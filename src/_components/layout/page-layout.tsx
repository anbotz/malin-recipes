import React from "react";
import { BackButton } from "../buttons/back-button";

type PageLayoutComponentType = {
  title: string;
  children: React.ReactNode;
  buttons?: React.ReactNode;
  back?: boolean;
};

export const PageLayoutComponent = ({
  title,
  children,
  buttons,
  back,
}: PageLayoutComponentType) => {
  return (
    <div className="flex flex-col m-3 flex-1">
      <div className="flex items-center justify-between mb-3">
        {back && <BackButton />} <h2 className="text-xl">{title}</h2>
        <div className="grow" />
        <div>{buttons}</div>
      </div>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
