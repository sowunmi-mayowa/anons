import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register" 
import Login from "./pages/Login" 
import Messages from "./pages/Messages"
import WriteMessage from "./pages/WriteMessage"
import Home from "./pages/Home"
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={< Register />} />
        <Route path="/login" element={< Login />} />
        <Route path="/messages" element={< Messages />} />
        <Route path="/:id" element={< WriteMessage />} />
        <Route path="/home" element={< Home />} />

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