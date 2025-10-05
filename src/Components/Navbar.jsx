
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [applicants, setApplicants] = useState(null);

  useEffect(() => {
    // Check localStorage for logged-in user
    const storedApplicants = localStorage.getItem("Applicants");
    try {
      setApplicants(storedApplicants ? JSON.parse(storedApplicants) : null);
      { storedApplicants?.role === "admin" && <Link to="/adminDashboard">Admin</Link> }
      { storedApplicants?.role === "student" && <Link to={`/home`}>Home</Link> }

    } catch (error) {
      console.error("Error parsing Applicants from localStorage:", error);
      localStorage.removeItem("Applicants");
    }
  }, []); // Runs once when the component mounts

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-teal text-gray-100 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-100 tracking-wider ">🎓 GISP</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {applicants ? (
              <>
                <NavLink to={`/home`} className=" hover:text-teal-300 transition uppercase tracking-widest">Home</NavLink>
                <NavLink to={`/overview`} className=" hover:text-teal-300 transition uppercase tracking-widest">Overview</NavLink>
                <NavLink to={`/scholarships`} className=" hover:text-teal-300 transition uppercase tracking-widest">Scholarships</NavLink>
                <NavLink to={`/contact`} className=" hover:text-teal-300 transition uppercase tracking-widest">Contact</NavLink>
                <NavLink to={`/profile`} className=" hover:text-teal-300 transition uppercase tracking-widest">Profile</NavLink>
                {applicants.role === "admin" && (

                <NavLink to="/adminDashboard" className=" hover:text-teal-300 transition uppercase tracking-widest">Admin dashboard</NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink to="/signup" className=" hover:text-teal-300 transition uppercase tracking-widest">Sign Up</NavLink>
                <NavLink to="/" className=" hover:text-teal-300 transition uppercase tracking-widest">Login </NavLink>
              </>
            )}
          </div>
          <div className="md:hidden transition-all duration-300 ">
            <span onClick={toggleMenu} className="material-symbols-outlined hover:text-teal-300 focus:outline-none ">
              {isOpen ? "close" : "menu"}
            </span>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-teal shadow-md">
          {applicants ? (
            <>
              <NavLink to={`/home`} className="block  hover:text-teal-300 transition uppercase tracking-widest">Home</NavLink>
              <NavLink to={`/overview`} className="block  hover:text-teal-300 transition uppercase tracking-widest">Overview</NavLink>
              <NavLink to={`/scholarships`} className="block  hover:text-teal-300 transition uppercase tracking-widest">Scholarships</NavLink>
              <NavLink to={`/contact`} className="block  hover:text-teal-300 transition uppercase tracking-widest">Contact</NavLink>
              <NavLink to={`/profile`} className="block  hover:text-teal-300 transition uppercase tracking-widest">Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/signup" className="block  hover:text-teal-300 transition uppercase tracking-widest">Sign Up</NavLink>
              <NavLink to="/" className="block  hover:text-teal-300 transition uppercase tracking-widest">Login </NavLink>
            </>
          )}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
