
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from './Pages/ScrollToTop';
import Navbar from './Components/Navbar';
import SignUp from './Pages/SignUp/SignUp';
import PrivateComp from './Pages/PrvtComp/PrivateComp';
import Home from './Pages/Home/Home';
import ApplicationForm from './Components/ApplicationForm';
import Profile from './Pages/Profile/Profile';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UniversitiesInfo, { UniDetails } from './Pages/UniversitiesInfo/UniversitiesInfo';
import Footer from './Components/Footer';
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from './Pages/Contact/Contact';
import Overview from './Pages/Overview/Overview';
import Scholarships from './Pages/Scholarships/Scholarships';
import Register from './Pages/Register/Register';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  return (
    <BrowserRouter>
      <div className='bg-custom'>
        <Navbar />
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Register />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Register />} />
          <Route path="/UniDetails/:id" element={<UniDetails />} />

          {/* Protected routes - all routes inside here require authentication */}
          <Route element={<PrivateComp />}>
            <Route path="/home" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/applicationForm" element={<ApplicationForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;