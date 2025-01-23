import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import MyAccount from "./pages/MyAccount";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dahboard";
import PublicAdvertisements from "./pages/PublicAdvertisements";
import Ads from "./pages/Ads";
import PostAds from "./pages/PostAds";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt"));

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setIsLoggedIn(!!jwt);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<PublicAdvertisements />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard/my-account" />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ads" element={<Ads />} />
          <Route path="post-ads" element={<PostAds />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
