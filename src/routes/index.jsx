import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import ItemDetail from "../pages/ItemDetail/ItemDetail";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Secret/Secret";
import { useAuthContext } from "../hooks/useAuth";
import Dashboard from "../pages/Dashboard/Dashboard";
import NewProducto from "../pages/NewProduct/NewProducto";

const Index = () => {
  const { isAuth } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/item/:id" element={<ItemDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/secret"
        element={isAuth ? <Secret /> : <Navigate to="/login" />}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/newproducto" element={<NewProducto />} />
    </Routes>
  );
};

export default Index;
