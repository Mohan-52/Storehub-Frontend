import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage";
import Signup from "./components/RegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
