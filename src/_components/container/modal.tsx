export const ModalComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 bg-white overflow-y-auto h-full w-full flex items-center justify-center z-20">
      <div className="modal-box w-full">{children}</div>
    </div>
  );
};
