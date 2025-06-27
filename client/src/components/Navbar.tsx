import { useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const { user, logout } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  // add more menu items & add the routing links here
  const menuItems = user ?
    [
      { label: `Hello ${user.name}!`},
      { label: "Favourites", href: "" },
      { label: "Your Profile", href: "" },
      { label: "Log out", href: "", onclick: logout }
    ]
    :
    [
      { label: "Log in", href: "/login" },
    ]
    ;

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="brand.primary"
      borderBottom="1px solid"
      borderColor="brand.secondary"
      zIndex="1000"
      boxShadow="md"
    >
      <Flex
        maxW="100%"
        mx="auto"
        px={{ base: 4, md: 6 }}
        h={{ base: '60px', md: '70px' }}
        align="center"
        justify="space-between"
        position="relative"
      >
        {isMobile && showMobileSearch ? (
          <Flex
            position="absolute"
            top="0"
            left="0"
            width="100vw"
            height="100%"
            bg="brand.primary"
            zIndex="1100"
            align="center"
            px={4}
            gap={2}
          >
            <SearchBar autoFocus onClose={() => setShowMobileSearch(false)} />
            <IconButton
              aria-label="Close search"
              icon={<CloseIcon />}
              variant="ghost"
              color="white"
              onClick={() => setShowMobileSearch(false)}
            />
          </Flex>
        ) : (
          <>
            <div className="navbar-brand" onClick={() => navigate('/')}>
              {/* brand name maybe logo*/}
              <span className="brand-text">Grapely</span>
            </div>
            {/* search bar */}
            {!isMobile && <SearchBar />}

            {/* Desktop Menu */}
            <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  as="a"
                  href={item.href}
                  className="nav-link"
                  onClick={item.onclick}
                >
                  {item.label}
                </Button>
              ))}
            </Flex>

            {/* Mobile Buttons */}
            <Flex display={{ base: 'flex', md: 'none' }} gap={2}>
              <IconButton
                icon={<Text as="span" fontSize="lg">🔍</Text>}
                aria-label="Open search"
                variant="ghost"
                color="white"
                onClick={() => setShowMobileSearch(true)}
              />
              <IconButton
                icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label="Toggle menu"
                variant="ghost"
                color="white"
                onClick={toggleMenu}
              />
            </Flex>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="mobile-nav-link"

                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onclick) {item.onclick();}
                    setIsMenuOpen(false)
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;