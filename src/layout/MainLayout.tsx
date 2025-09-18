import { memo } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-[900px] mx-auto w-full">
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default memo(MainLayout);
