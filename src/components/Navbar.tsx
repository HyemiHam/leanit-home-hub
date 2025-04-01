
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/src/assets/leanit-logo.gif" 
            alt="leanIT 로고"
            className="h-12 md:h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-800 hover:text-brand-500 font-medium transition-colors"
          >
            홈
          </Link>
          <Link
            to="/services"
            className="text-gray-800 hover:text-brand-500 font-medium transition-colors"
          >
            서비스
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-brand-500 font-medium transition-colors"
          >
            회사소개
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "60px" }}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          <Link
            to="/"
            className="text-xl text-gray-800 hover:text-brand-500 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            홈
          </Link>
          <Link
            to="/services"
            className="text-xl text-gray-800 hover:text-brand-500 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            서비스
          </Link>
          <Link
            to="/education"
            className="text-xl text-gray-800 hover:text-brand-500 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            교육
          </Link>
          <Link
            to="/about"
            className="text-xl text-gray-800 hover:text-brand-500 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            회사소개
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
