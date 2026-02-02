import AppRoutes from "./routes/router.jsx";
import { AuthProvider } from "./components/Authentication/context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
