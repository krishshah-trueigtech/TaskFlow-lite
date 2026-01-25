import "./App.css";
import AppRoutes from "./routes/router.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <h1>TaskFlow-lite</h1>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
