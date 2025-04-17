import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./context/context";
import { useEffect, useState } from "react";

import Login from "./components/LoginPage";
import Signup from "./components/RegistrationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Cookies from "js-cookie";

function App() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = Cookies.get("user_role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <userContext.Provider value={{ userRole, setUserRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
