interface FlexLayoutProps {
  children: React.ReactNode;
}

const FlexLayout = ({ children }: FlexLayoutProps) => {
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col px-4">
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FlexLayout;