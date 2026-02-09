import AppRoutes from "./routes/router.jsx";
import { AuthProvider } from "./components/Authentication/context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ModalProvider } from "./common/Modal/context/ModalContext.jsx";
import GlobalModal from "./common/Modal/components/GlobalModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskProvider } from "./components/Tasks/context/TaskContext";
import ErrorBoundary from "./common/components/ErrorBoundary/index";

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <TaskProvider>
              <Navbar />
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
              <GlobalModal />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                pauseOnHover={false}
              />
            </TaskProvider>
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
