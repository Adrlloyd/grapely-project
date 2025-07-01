import React from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface StarRatingProps {
  rating: number;
  onRate?: (value: number) => void;
}

function StarRating({ rating, onRate }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < rating;

    return (
      <IconButton
        key={i}
        aria-label={`Rate ${i + 1} stars`}
        icon={<StarIcon />}
        size='md'
        type='button'
        color={filled ? 'yellow.400' : 'gray.300'}
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onRate?.(i + 1);
        }}
        isDisabled={!onRate}
        _hover={ onRate ? { color: 'yellow.500' } : undefined}
      />
    );
  });
  
  return (
    <HStack spacing={1}>{stars}</HStack>
  )
}

export default StarRating;