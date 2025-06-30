import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  Image,
  HStack,
  useDisclosure
} from '@chakra-ui/react';
import type { Wine } from '../types/wine';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const formatPrice = (price?: number) => {
  if (!price) return 'Price not available';
  return `$${price.toFixed(2)}`;
};

const RandomButton = () => {
  const [wine, setWine] = useState<Wine | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/random`);
      const data = await response.json();
      setWine(data);
      onOpen();
    } catch (error) {
      console.error('Error fetching random wine:', error);
    }
  };

  const handleCardClick = () => {
    if (wine) {
      navigate('/summary', { state: { wine } });
      onClose();
    }
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        type="button"
        mt={4}
        bg="brand.primary"
        color="white"
        fontSize="md"
        fontWeight="semibold"
        fontFamily="body"
        borderRadius="md"
        px={6}
        py={2.5}
        _hover={{ bg: 'brand.secondary' }}
      >
        Random
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.400" />
        <ModalContent
          borderRadius="xl"
          maxW="md"
          p={4}
          bg="white"
          onClick={handleCardClick}
          cursor="pointer"
          _hover={{ boxShadow: 'xl' }}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleCardClick();
          }}
        >
          <ModalCloseButton />
          <ModalBody>
            {wine && (
              <HStack spacing={4} align="start">
                {wine.image_url && (
                  <Image
                    src={`${API_BASE_URL}/${wine.image_url}`}
                    alt={wine.name}
                    boxSize="100px"
                    objectFit="contain"
                    borderRadius="md"
                  />
                )}
                <VStack align="start" spacing={2} w="100%">
                  <Text fontSize="xl" fontWeight="bold" color="brand.primary" fontFamily="heading">
                    {wine.name}
                  </Text>
                  <Text><strong>Grape:</strong> {wine.grape}</Text>
                  <Text><strong>Color:</strong> {wine.color}</Text>
                  <Text><strong>Country:</strong> {wine.country}</Text>
                  <Text><strong>Price:</strong> {formatPrice(wine.price)}</Text>
                </VStack>
              </HStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RandomButton;
