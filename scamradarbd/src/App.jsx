import { Navigate, Outlet } from "react-router-dom";
import HomeBar from "./components/body/HomeBar";
import Header from "./components/header/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { isAuthenticated } = useSelector((store) => store.auth);
  useEffect(() => {}, [isAuthenticated]);
  if (!isAuthenticated) {
    return <Navigate to="/login/" replace />;
  }

  return (
    <div className="grid bg-[#0f0f0f] grid-flow-col text-white grid-cols-4 md:grid-cols-12 gap-1  ">
      <Header />
      <div className=" col-span-3 border-r-1 p-3 md:col-span-6 rounded">
        <HomeBar />
        <hr />
        <Outlet />
      </div>
      <div className="hidden md:block p-3  rounded md:col-span-5">grid3</div>
    </div>
  );
}

export default App;
