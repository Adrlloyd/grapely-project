import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import SearchBar from './Searchbar';
import {useAuth} from '../context/useAuth';
import {useNavigate} from 'react-router';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const {user, logout} = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // handle window resize to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // checking whether mobile menu is open or closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


   // add more menu items & add the routing links here
  const menuItems = user ?
    [
    { label: "Favourites", href: "" },
    { label: "Your Profile", href: "" },
    { label: "Log out", href: '#', onclick: logout}
  ]
    :
    [
    { label: "Log in", href: "/login" },
  ]


  ;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {isMobile && showMobileSearch ? (
          <div className="mobile-searchbar-wrapper">
            <SearchBar autoFocus onClose={() => setShowMobileSearch(false)} />
            <button className="close-search-btn" onClick={() => setShowMobileSearch(false)} aria-label="Close search">✖</button>
          </div>
        ) : (
          <>
            <div className="navbar-brand" onClick={()=> navigate('/')}>
              {/* brand name maybe logo*/}
              <span className="brand-text">Grapely</span>
            </div>
            {/* search bar */}
            {!isMobile && <SearchBar />}
            {/* desktop menu */}
            <div className="navbar-menu desktop-menu">
              {/* this maps the menu items to link objects */}
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </a>
              ))}
            </div>
            {/* mobile search toggle */}
            {isMobile && (
              <button
                className="mobile-search-toggle"
                onClick={() => setShowMobileSearch(true)}
                aria-label="Open search"
              >
                <span role="img" aria-label="search">🔍</span>
              </button>
            )}
            {/* mobile menu */}
            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;