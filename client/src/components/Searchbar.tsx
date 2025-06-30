import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router';
import type { Wine } from '../types/wine';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react';

interface SearchBarProps {
  autoFocus?: boolean;
  onClose?: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const SearchBar: React.FC<SearchBarProps> = ({ autoFocus = false, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(() => {
    let timeoutId: number;
    return (searchQuery: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
    };
  }, [])();

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to fetch results.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
    setDropdownOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(query);
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
    }
  }, [query]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (results.length > 0 && query.trim()) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [results, query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPrice = (price?: number) => {
    if (!price) return 'Price not available';
    return `$${price.toFixed(2)}`;
  };

  return (
    <Box 
      ref={containerRef} 
      w={{ base: '90%', md: '400px' }} 
      mx="auto" 
      position="relative"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="Search wines..."
          value={query}
          onChange={handleInputChange}
          autoFocus={autoFocus}
          onFocus={() => results.length > 0 && setDropdownOpen(true)}
          borderRadius="md 0 0 md"
          bg="white"
          color="black"
          borderColor="gray.300"
          _placeholder={{ color: 'gray.500' }}
        />
        <Button
          type="submit"
          borderRadius="0 md md 0"
          bg="brand.primary"
          color="white"
          _hover={{ bg: '#5e2347' }}
        >
          {isMobile ? '🔍' : ''}
        </Button>
      </form>

      {loading && <Text mt={2} color="brand.primary" fontStyle="italic">Searching...</Text>}
      {error && <Text mt={2} color="red.500">{error}</Text>}

      {dropdownOpen && results.length > 0 && !loading && !error && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={1}
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="0 0 8px 8px"
          maxHeight="350px"
          overflowY="auto"
          zIndex={10}
          boxShadow="lg"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('/images/wine-background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.6,
            zIndex: -1,
            pointerEvents: 'none',
            borderRadius: '0 0 8px 8px'
          }}
        >
          <VStack spacing={0} align="stretch">
            {results.map((result) => (
              <Box
                as={Link}
                to="/summary"
                state={{ wine: result }}
                key={result.id}
                _hover={{ bg: 'rgba(247, 250, 252, 0.8)' }}
                px={4}
                py={3}
                display="flex"
                gap={4}
                textDecoration="none"
                color="inherit"
                position="relative"
                bg="rgba(255, 255, 255, 0.9)"
              >
                <Box flex="1">
                  <Text fontWeight="bold" fontSize="md" color="black"><strong>{result.name}</strong></Text>
                  <Flex wrap="wrap" gap={2} mt={1} fontSize="sm">
                    {result.grape && <Text color="black"><strong>Grape:</strong> {result.grape}</Text>}
                    {result.color && <Text color="black"><strong>Color:</strong> {result.color}</Text>}
                    {result.country && <Text color="black"><strong>Country:</strong> {result.country}</Text>}
                    {result.price && <Text color="black"><strong>Price:</strong> {formatPrice(result.price)}</Text>}
                  </Flex>
                </Box>
                {result.image_url && (
                  <Image
                    src={`${API_BASE_URL}/${result.image_url}`}
                    alt={result.name}
                    boxSize="48px"
                    objectFit="contain"
                    borderRadius="md"
                  />
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;