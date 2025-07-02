import { HStack, IconButton } from "@chakra-ui/react";
import { LuGrape } from "react-icons/lu";

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
        icon={<LuGrape />}
        size='lg'
        type='button'
        color={filled ? 'primary.500' : 'gray.300'}
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onRate?.(i + 1);
        }}
        isDisabled={!onRate}
        _hover={onRate ? { color: 'primary.600' } : undefined}
      />
    );
  });

  return <HStack spacing={1}>{stars}</HStack>;
}

export default StarRating;