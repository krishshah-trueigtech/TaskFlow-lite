import "./App.css";
import AppRoutes from "./routes/router.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <h1>TaskFlow-lite</h1>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
