import React from 'react';
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import StarRating from './StarRating';
import type { Wine } from '../types/wine';
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MotionBox = motion(Box);

interface WineCardProps {
  wine: Wine;
  index: number,
  onRate: (value: number) => void;
  onSelect: () => void;
}

const WineCard = React.memo(({ wine, index, onRate, onSelect }: WineCardProps) => {
  return (
    <MotionBox
      key={wine.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.4, duration: 0.6 }}
      position="relative"
      w="260px"
      bg="white"
      borderRadius="16px"
      boxShadow="0 4px 14px rgba(0, 0, 0, 0.08)"
      cursor="pointer"
      p="1rem 1rem 1.5rem"
      transitionProperty="transform, box-shadow"
      transitionDuration="0.3s"
      transitionTimingFunction="ease"
      onClick={() => onSelect()}
      _hover={{
        transform: "scale(1.03)",
        boxShadow: "0 6px 20px rgba(123, 46, 90, 0.2)",
        zIndex: 2,
        "& .wine-image-wrapper": {
          top: "-60px",
        },
        "& .wine-image": {
          transform: "scale(1.12)",
        },
      }}
    >
      <Box
        className="wine-image-wrapper"
        position="relative"
        top="-50px"
        display="flex"
        justifyContent="center"
        zIndex={1}
        transition="top 0.3s ease"
      >
        <Image
          className="wine-image"
          src={`${BASE_URL}/${wine.image_url}`}
          alt={wine.name}
          w="100px"
          h="auto"
          objectFit="contain"
          transition="transform 0.3s ease"
          zIndex={3}
        />
      </Box>

      <VStack spacing={2} pt={2} textAlign="center">
        <Text fontWeight="600" color="brand.primary" fontSize="md">
          {wine.name}
        </Text>
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">Country:</Text> {wine.country}
        </Text>
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">Grape:</Text> {wine.grape}
        </Text>
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">Price:</Text> ${wine.price}
        </Text>
        <StarRating
          rating={wine.ratings?.[0]?.score ?? 0}
          onRate={onRate}
        />
      </VStack>
    </MotionBox>
  );
}, (prevProps, nextProps) => {
  return prevProps.wine.ratings?.[0]?.score === nextProps.wine.ratings?.[0]?.score;
});

export default WineCard;