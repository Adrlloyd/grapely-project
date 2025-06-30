import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/useAuth';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Registration failed');

      const data = await res.json();

      login({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        token: data.token,
      });

      navigate('/');
    } catch (error) {
      alert('Registration failed');
      console.error('Registration failed:', error);
    }
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt="2rem"
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
        Create Account
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel color="brand.primary" fontWeight="bold">First Name</FormLabel>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              bg="white"
              borderColor="brand.primary"
              _focus={{ borderColor: 'brand.secondary' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="brand.primary" fontWeight="bold">Last Name</FormLabel>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              bg="white"
              borderColor="brand.primary"
              _focus={{ borderColor: 'brand.secondary' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="brand.primary" fontWeight="bold">Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              bg="white"
              borderColor="brand.primary"
              _focus={{ borderColor: 'brand.secondary' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="brand.primary" fontWeight="bold">Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              bg="white"
              borderColor="brand.primary"
              _focus={{ borderColor: 'brand.secondary' }}
            />
          </FormControl>

          <Button
            type="submit"
            mt={4}
            bg="brand.primary"
            color="white"
            _hover={{ bg: 'brand.secondary' }}
          >
            Create Account
          </Button>
        </VStack>
      </form>

      <Text mt={6} fontSize="sm" textAlign="center" color="gray.600">
        Already have an account? Log in from the menu.
      </Text>
    </Box>
  );
};

export default RegisterForm;