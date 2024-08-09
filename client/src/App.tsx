import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
};

export default App;
