import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import store from './store/store.js';
const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
        {
          index: true,
          element: <App />,
        },
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
