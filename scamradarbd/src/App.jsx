import Header from "./components/header/Header"

function App() {
  
  return (
      <div className='grid grid-flow-col text-white grid-cols-4 md:grid-cols-12 gap-1  '>
          <Header /> 
        <div className="bg-[#200d21] col-span-3 md:col-span-7">
          grid2
        </div>
        <div className="hidden md:block bg-[#200d21] md:col-span-4">
          grid3
        </div>

      </div>
  )
}

export default App
