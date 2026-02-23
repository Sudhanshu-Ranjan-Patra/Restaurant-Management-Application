
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCookie } from "./api/axios";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import FoodManagement from "./pages/FoodManagement";
import OrderManagement from "./pages/OrderManagement";
import PlaceOrder from "./pages/PlaceOrder";
import RestaurantManagement from "./pages/RestaurantManagement";
import CategoryManagement from "./pages/CategoryManagement";
function App() {
  const token = getCookie("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/food"
          element={token ? <FoodManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/order"
          element={token ? <OrderManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/placeorder"
          element={token ? <PlaceOrder /> : <Navigate to="/login" />}
        />
        <Route
          path="/restaurants"
          element={token ? <RestaurantManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/categories"
          element={token ? <CategoryManagement /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
