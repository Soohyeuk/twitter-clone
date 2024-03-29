import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import Home from './routes/home';
import Profile from './routes/profile';
import Login from './routes/login';
import Acc from "./routes/create-account";
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import LoadingScreen from './components/loading-screen';
import { auth } from './firebase';
import ProtectedRoute from './components/protected-route';
import ResetPW from './routes/resetPassword';



const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

//router for the website 
const router = createBrowserRouter([
  {
    path: "/",
    element:  <ProtectedRoute> <Layout/> </ProtectedRoute>, 
    children: [
      {
        path: "",
        element: <Home/>, 
      },
      {
        path: "profile",
        element: <Profile/>,
      }
    ],
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "create-account", 
    element: <Acc/>,
  },
  {
    path: "resetPassword",
    element: <ResetPW/>
  }, 
])


//general CSS style for the website
const Global = createGlobalStyle`         
  ${reset};
  * {
    box-sizing: border-box; 
  }
  body {
    background-color: black; 
    color: white; 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  }
`;

function App() {
  const [isLoading, setLoading] = useState(true); 
  const init = async () => {
    await auth.authStateReady();
    setLoading(false); 
  }
  useEffect( () => {init()
  }, []);

  return (
    <Wrapper>
      <Global/>
      {isLoading ? <LoadingScreen/> :  <RouterProvider router = {router} /> }
    </Wrapper>
  )
}

export default App
