import { Navigate, Outlet } from "react-router-dom"
import HomeBar from "./components/body/HomeBar"
import Header from "./components/header/Header"
import { useSelector } from "react-redux"

function App() {
  const {isAuthenticated}=useSelector(store=>store.auth)
  if(!isAuthenticated){
    return <Navigate to='/login/' replace />
}
  return (
      <div className='grid grid-flow-col bg-black text-white grid-cols-4 md:grid-cols-12 gap-1  '>
         <Header /> 
        <div className="bg-[#141624] col-span-3 p-3 md:col-span-6 rounded">
          <HomeBar />
          <hr />
          <Outlet />
        </div>
        <div className="hidden md:block p-3  rounded bg-[#141624] md:col-span-5">
          grid3
        </div>

      </div>
  )
}

export default App
