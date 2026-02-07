import AppRoutes from "./routes/router.jsx";
import { AuthProvider } from "./components/Authentication/context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ModalProvider } from "./common/Modal/context/ModalContext.jsx";
import GlobalModal from "./common/Modal/components/GlobalModal";

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <Navbar />
            <AppRoutes />
            <GlobalModal />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
