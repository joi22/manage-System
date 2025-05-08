import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContextProvider';

const NaveBar = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);
const {user , logout} = UserContext
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Fixed Navbar */}
            <nav
                className={`fixed w-full top-0 left-0 z-50 transition-all ${isScrolled ? "backdrop-blur-md bg-white/80 shadow-md" : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    {/* Left - Logo */}
                    <div className="text-2xl font-bold text-gray-800">LOGO</div>

                    {/* Center - Navigation Links */}
                    <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
                        <Link to="/">Home</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/aboutus">About Us</Link>
                        <Link to="/contactus">Contact Us</Link>
                    </div>

                    {/* Right - Buttons */}
                 
                </div>
            </nav>

            {/* Spacer to prevent content overlap */}
            <div className="pt-16"></div>
        </>
    );
};

export default NaveBar;
