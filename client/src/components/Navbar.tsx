import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Image,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import SearchBar from './Searchbar';
import { useAuth } from '../context/useAuth';

function Navbar() {
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
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const menuItems = user?
    [
      { label: `Hello ${user.firstName}!`},
      { label: "Favourites", href: "" , onClick: () => navigate('/favourites')},
      { label: "Your Profile", href: "", onClick: () => navigate('/userProfile')},
      { label: "Log out", href: "", onClick: logout }
    ]
    :
    [
      { label: "Log in", href: "", onClick: () => navigate('/login') },
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
        {/* Mobile Search Mode */}
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
            {/* Logo and brand */}
            <Flex
              align="center"
              gap={3}
              cursor="pointer"
              onClick={() => navigate('/region')}
              flexShrink={0}
            >
              <Image
                src="/logo/noun-wine-5003254.png"
                alt="Grapely Logo"
                height={{ base: '55px', md: '70px' }}
                objectFit="cover"
                objectPosition="top"
                sx={{
                  clipPath: 'inset(0 0 20% 0)',
                  filter: 'brightness(1.1) contrast(1.05)',
                }}
              />
              <Text
                fontSize="2rem"
                fontWeight="bold"
                color="brand.tertiary"
                fontFamily="heading"
              >
                Grapely
              </Text>
            </Flex>

            {/* Desktop Search + Menu */}
            <Flex
              gap={4}
              align="center"
              display={{ base: 'none', md: 'flex' }}
              ml="auto"
            >
              <SearchBar />
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  color="white"
                  onClick={item.onClick}
                  _hover={{
                    bg: 'brand.secondary',
                    color: 'brand.tertiary',
                  }}
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
            {isMobile && isMenuOpen && (
              <VStack
                position="absolute"
                top={{ base: '60px', md: '70px' }}
                left="0"
                w="100%"
                bg="brand.secondary"
                spacing={2}
                py={4}
                zIndex="1001"
              >
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'brand.tertiary', color: 'brand.primary' }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.onClick) item.onClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </VStack>
            )}
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;