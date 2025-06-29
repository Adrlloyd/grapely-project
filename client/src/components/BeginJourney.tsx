import { Box, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import RandomButton from '../components/RandomButton';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@chakra-ui/icons';

// Motion components using framer-motion's create method
const MotionVStack = motion.create(VStack);
const MotionHStack = motion.create(HStack);
const MotionText = motion.create(Text);

function BeginJourney() {
  const navigate = useNavigate();

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
      bg="white"
    >
      <MotionVStack
        spacing={{ base: 6, md: 12 }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <MotionText
          as="h1"
          fontSize={{ base: '5xl', md: '7xl' }}
          fontFamily="heading"
          color="brand.primary"
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        >
          Grapely
        </MotionText>

        <MotionText
          fontSize={{ base: 'lg', md: '2xl' }}
          color="gray.700"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          Begin your journey through the world of wine…
        </MotionText>

        <MotionHStack
          spacing={4}
          justify="center"
          align="center"
          cursor="pointer"
          onClick={handleNavigate}
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <Icon as={ChevronRightIcon} w={8} h={8} color="brand.primary" />
          </motion.div>
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 4, ease: 'linear' },
              scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
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
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
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