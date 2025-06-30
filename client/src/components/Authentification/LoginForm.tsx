import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../context/useAuth';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Invalid login');

      const data = await response.json();
      login({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        token: data.token,
      });

      navigate('/');
    } catch (error) {
      alert('Login failed');
      console.error('Login failed:', error);
    }
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt="4rem"
      p="2rem"
      borderRadius="lg"
      boxShadow="lg"
      bg="whiteAlpha.900"
    >
      <Heading
        as="h2"
        size="lg"
        mb={6}
        textAlign="center"
        fontFamily="heading"
        color="brand.primary"
      >
        Log in
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel color="brand.primary" fontWeight="bold">Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
              borderColor="brand.primary"
              _focus={{ borderColor: 'brand.secondary' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="brand.primary" fontWeight="bold">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              borderColor="brand.primary"
              _focus={{ borderColor: 'brand.secondary' }}
            />
          </FormControl>

          <Button
            type="submit"
            bg="brand.primary"
            color="white"
            _hover={{ bg: 'brand.secondary' }}
            mt={4}
          >
            Log in
          </Button>
        </VStack>
      </form>

      <Text mt={6} textAlign="center" color="gray.600">
        Don&apos;t have an account?{' '}
        <Link to="/register">
          <Text as="span" color="brand.primary" fontWeight="bold" textDecoration="underline">
            Create one here
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default LoginForm;
