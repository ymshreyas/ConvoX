import Navbar from "./Navbar";
import SideBar from "./SideBar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <SideBar />}

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
