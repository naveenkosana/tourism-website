import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import DestinationPage from "./components/DestinationPage/DestinationPage";
import Homepage from "./components/HomePage/HomePage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import BookingPage from "./components/BookingPage/BookingPage";
import BookingConfirmationPage from "./components/BookingConfirmationPage/BookingConfirmationPage";
// import { AuthProvider } from "./AuthContext";

function App() {
  return (
    //<AuthProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/destinations/:id" element={<DestinationPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmationPage />}
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
    //</AuthProvider>
  );
}

export default App;
