export const ButtonContainerComponent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex gap-5 flex-row justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};
