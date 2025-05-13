import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContextProvider';

const NaveBar = () => {
  const { user, logout } = useContext(UserContext); // ✅ FIXED
  const [isScrolled, setIsScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full top-0 left-0 z-50 transition-all ${isScrolled ? "backdrop-blur-md bg-white/80 shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold text-gray-800"><Link to="/">LOGO</Link></div>
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/contactus">Contact Us</Link>
          </div>
          <div className="flex items-center  space-x-4">
            {user ? (
              <>
                <Link to="/profile">
                  <img
                    src={user.profilePic || './Users/default-avatar.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 hover:ring-2 hover:text-[#9A282B] transition"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-[#9A282B] text-white px-4 py-2 rounded-md hover:bg-[#801d21] transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-[#9A282B] text-[#9A282B] px-4 py-2 rounded-md hover:bg-[#9A282B] hover:text-white transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="pt-16"></div>
    </>
  );
};

export default NaveBar;
