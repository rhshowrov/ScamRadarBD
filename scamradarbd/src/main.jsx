import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import store from './store/store.js';
import Search from './components/Search/Search.jsx';
import Post from './components/Post/Post.jsx';
import Login from './components/Login.jsx';
import SignUp from './SignUp.jsx';
import Logout from './components/Logout.jsx';
const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
        {
          index: true,
          element: <Post />,
        },
        {
          path:'/post',
          element: <Post />,
        },
        {
          path:'/search',
          element: <Search />,
        },
    ],
  },
  {
    path:'/login',
    element:<Login />,
  },
  {
    path:'/signup',
    element:<SignUp />,
  },
  {
    path:'/logout',
    element:<Logout />,
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
