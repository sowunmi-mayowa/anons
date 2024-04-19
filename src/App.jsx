import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import WriteMessage from "./pages/WriteMessage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:id" element={<WriteMessage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
