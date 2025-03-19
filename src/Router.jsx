import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Chatroom from './Chatroom'
import Users from './Users'
import NewChatroom from './NewChatroom'
import ErrorPage from './ErrorPage'

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
          path: 'login',
          element: <Login/>,
      },
      {
        path: 'chatroom',
        element: <Chatroom/>,
      },
      {
        path: 'users',
        element: <Users/>,
      },
      {
        path: 'chatroom/new',
        element: <NewChatroom/>,
      }
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;