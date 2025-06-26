import { useState, useEffect } from 'react';
import SearchBar from './Searchbar';
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

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const menuItems = [
    { label: 'Home Placeholder', href: '' },
    { label: 'Login Placeholder', href: '' },
    { label: 'User Profile Placeholder', href: '' },
  ];

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
            {/* Logo and Brand */}
            <Flex
              align="center"
              gap={{ base: 2, md: 4 }}
              pl={{ base: 0, md: 4 }}
              mr={4}  
              flexShrink={0}
            >
              <Image
                src="/noun-wine-5003254.png"
                alt="Grapely Logo"
                height={{ base: '55px', md: '72px' }}
                objectFit="cover"
                objectPosition="top"
                clipPath="inset(0 0 20% 0)"
                filter="brightness(1.1) contrast(1.05)"
              />
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="brand.tertiary"
                fontFamily="heading"
              >
                Grapely
              </Text>
            </Flex>

            {/* Desktop Search */}
            {!isMobile && <SearchBar />}

            {/* Desktop Menu */}
            <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  as="a"
                  href={item.href}
                  variant="solid"
                  size="sm"
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
                    as="a"
                    href={item.href}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'brand.tertiary', color: 'brand.primary' }}
                    onClick={() => setIsMenuOpen(false)}
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