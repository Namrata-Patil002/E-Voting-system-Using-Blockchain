import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/Auth";
import CustomRoutes from "./components/CustomRoutes";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <div>
          <ToastContainer />
          <AuthProvider>
            <CustomRoutes />
          </AuthProvider>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
