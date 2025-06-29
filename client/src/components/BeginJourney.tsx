import { Box, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import RandomButton from '../components/RandomButton';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

// Motion components using framer-motion's create method
const MotionVStack = motion.create(VStack);
const MotionHStack = motion.create(HStack);
const MotionText = motion.create(Text);

function BeginJourney() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = () => {
    navigate('/region');
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      textAlign="center"
      position="relative"
      backgroundImage="url('/images/wine-background.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        zIndex: 0
      }}
    >
      <MotionVStack
        spacing={{ base: 6, md: 12 }}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              when: 'beforeChildren',
              staggerChildren: 1.2,
              delayChildren: 0.5,
            },
          },
        }}
        position="relative"
        zIndex={1}
      >
        <MotionText
          as="h1"
          fontSize={{ base: '7xl', md: '9xl', lg: '10xl' }}
          fontFamily="heading"
          color="brand.primary"
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { 
              opacity: 1, 
              y: 0,
              scale: 1,
              transition: {
                duration: 1.5,
                ease: "easeOut"
              }
            }
          }}
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            fontWeight: 'bold'
          }}
        >
          Grapely
        </MotionText>

        <MotionText
          fontSize={{ base: 'lg', md: '2xl' }}
          color="gray.700"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 1.2,
                ease: "easeOut"
              }
            }
          }}
          style={{ 
            fontStyle: 'italic',
            letterSpacing: '0.5px'
          }}
        >
          Begin your journey through the world of wine…
        </MotionText>

        <MotionHStack
          spacing={4}
          justify="center"
          align="center"
          cursor="pointer"
          onClick={handleNavigate}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 1.0,
                ease: "easeOut"
              }
            }
          }}
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.2s ease'
          }}
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: 'easeInOut',
              delay: 2.5
            }}
          >
            <Icon as={ChevronRightIcon} w={8} h={8} color="brand.primary" />
          </motion.div>
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 4, ease: 'linear', delay: 2.5 },
              scale: { repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 2.5 }
            }}
          >
            <Text fontSize={{ base: '4xl', md: '6xl' }} role="img" aria-label="globe">
              🌍
            </Text>
          </motion.div>
        </MotionHStack>

        <MotionVStack 
          spacing={1} 
          mt={6} 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 1.0,
                ease: "easeOut"
              }
            }
          }}
        >
          <Text fontSize="sm" color="gray.500">
            Feeling adventurous?
          </Text>
          <RandomButton />
        </MotionVStack>
      </MotionVStack>
    </Box>
  );
}

export default BeginJourney;