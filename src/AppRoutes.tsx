import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Pricings from "./pages/Pricings";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/pricing" element={<Pricings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
