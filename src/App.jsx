import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RoutesIndex from "./routes/Index.jsx";
import { SearchProvider } from "./context/SearchContex";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <BrowserRouter>
              <Navbar />
              <RoutesIndex />
            </BrowserRouter>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
