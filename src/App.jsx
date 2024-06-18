import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register" 
import Login from "./pages/Login" 
import Messages from "./pages/Messages"
import WriteMessage from "./pages/WriteMessage"
import Home from "./pages/Home"
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Profile from "./pages/Profile";
import Error from './components/Error'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome />} errorElement={< Error/>} />
        <Route path="/register" element={< Register />} errorElement={< Error/>} />
        <Route path="/login" element={< Login />} errorElement={< Error/>} />
        <Route path="/messages" element={< Messages />} errorElement={< Error/>} />
        <Route path="/:id" element={< WriteMessage />} errorElement={< Error/>} />
        <Route path="/home" element={< Home />} errorElement={< Error/>} />
        <Route path="/profile" element={< Profile />} errorElement={< Error/>} />

      </>
    )
  )
  return (
    <div>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </div>
  )
}

export default App