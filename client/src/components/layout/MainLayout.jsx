import { Outlet } from "react-router-dom";
import { memo } from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = memo(() => {
  return (
    <div className="min-h-screen h-fit flex flex-col">
      <Header />
      <main className="flex-grow" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
});

MainLayout.displayName = "MainLayout";

export default MainLayout;
