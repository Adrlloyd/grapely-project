import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Box
        as="main"
        pt={{ base: '80px', md: '90px' }}
        px={{ base: 1, md: 8 }}
        maxW="100%"
        mx="auto"
        w="100%"
      >
        {children}
      </Box>
    </>
  );
}

export default Layout;
