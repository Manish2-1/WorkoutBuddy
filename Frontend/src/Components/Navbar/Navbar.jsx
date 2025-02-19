import React from "react";
import { Link } from "react-router-dom";
import { GiMuscleUp } from "react-icons/gi";
import { useLogout } from "../../Hooks/UseLogout";
import { useAuthContext } from "../../Hooks/UseAuthContext";
import { motion } from "framer-motion";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  // Function to extract initials from email
  const getUserInitials = (email) => {
    if (!email) return "?";
    return email.split("@")[0];
  };

  return (
    <header className="bg-gray-900 shadow-lg fixed top-0 left-0 w-full z-50">
      <motion.div
        className="container mx-auto flex items-center justify-between py-4 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link to="/" className="flex items-center space-x-3 group">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <GiMuscleUp className="text-yellow-400 text-4xl drop-shadow-lg group-hover:scale-110 transition-transform" />
          </motion.div>
          <h1 className="text-white text-3xl font-bold tracking-wide group-hover:text-yellow-400 transition-all">
            Workout Buddy
          </h1>
        </Link>

        {user ? (
          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-white text-lg font-medium bg-gray-800 px-4 py-2 rounded-full shadow-md">
              {getUserInitials(user.user?.email)}
            </span>
            <motion.button
              className="px-6 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 border border-red-500 rounded-lg shadow-lg transition-all duration-300 hover:from-red-600 hover:to-red-800 hover:scale-105 active:scale-95"
              onClick={handleClick}
              whileTap={{ scale: 0.9 }}
            >
              Logout
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link
              to="/login"
              className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-all"
            >
              <FaSignInAlt className="text-xl" />
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-all"
            >
              <FaUserPlus className="text-xl" />
              <span>Signup</span>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </header>
  );
};

export default Navbar;