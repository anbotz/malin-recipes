export const HeroButtonContainerComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex gap-5 flex-col sm:flex-row justify-center items-center mt-10`}
    >
      {children}
    </div>
  );
};
