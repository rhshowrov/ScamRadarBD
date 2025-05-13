import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import store from "./store/store.js";
import Search from "./components/Search/Search.jsx";
import Post from "./components/Post/Post.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./SignUp.jsx";
import Logout from "./components/Logout.jsx";
import CreatePost from "./components/createpost/CreatePost.jsx";
import PostDetails from "./components/Post/PostDetails.jsx";
import SortedPost from "./components/sortedPost/SortedPost.jsx";
import { injectStore } from "./api/api";
import ProfileBase from "./components/Profile/ProfileBase.jsx";
import ProfileDetails from "./components/Profile/ProfileDetails.jsx";
import ChangePass from "./components/Profile/ChangePass.jsx";
import ProfileUpdate from "./components/Profile/ProfileUpdate.jsx";
import Notifications from "./components/Notification/Notifications.jsx";

injectStore(store); // This prevents circular import
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="posts" replace />, // Redirect `/` to `/posts`
      },
      {
        path: "posts",
        element: <Post />,
      },
      {
        path: "posts/details/:id",
        element: <PostDetails />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "sort",
        element: <SortedPost />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "profile",
        element: <ProfileBase />,
        children: [
          {
            index: true,
            element: <Navigate to="info" replace />,
          },
          {
            path: "info",
            element: <ProfileDetails />,
          },
          {
            path: "change_password",
            element: <ChangePass />,
          },
          {
            path: "update",
            element: <ProfileUpdate />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
