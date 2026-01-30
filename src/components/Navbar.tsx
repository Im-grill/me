const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-card/80 backdrop-blur-md border-b border-border/50 flex items-center px-4">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <h1 className="text-xl font-bold text-primary tracking-tight">
          <a href="/">Thorcon</a>
        </h1>
      </div>
    </header>
  );
};

export default Navbar;
