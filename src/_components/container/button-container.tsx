export const ButtonContainerComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex gap-5 flex-row justify-center items-center mt-3`}
    >
      {children}
    </div>
  );
};
