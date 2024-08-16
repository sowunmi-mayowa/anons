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
import RecoverPassword from "./pages/RecoverPassword";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  const isMobile = window.innerWidth < 768;
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome />} errorElement={< Error/>} />
        <Route path="/register" element={< Register />} errorElement={< Error/>} />
        <Route path="/login" element={< Login />} errorElement={< Error/>} />
        <Route path="/messages" element={<ProtectedRoute> <Messages /> </ProtectedRoute>} errorElement={< Error/>} />
        <Route path="/:id" element={< WriteMessage />} errorElement={< Error/>} />
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} errorElement={< Error/>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} errorElement={< Error/>} />
        <Route path="/reset-password" element={< RecoverPassword/>} errorElement={< Error/>} />

      </>
    )
  )
  return (
    <div>
      {
        isMobile ? (
          <Theme>
            <RouterProvider router={router} />
          </Theme>
        ) : (
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <p className="text-xl font-semibold text-red-500">This website is unavailable on desktop. Please use a mobile device.</p>
          </div>
        )
      }
    </div>
  )
}

export default App