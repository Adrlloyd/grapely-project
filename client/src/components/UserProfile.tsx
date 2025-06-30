import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { updatePassword, deleteUser } from '../services/userService';

function UserProfile() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [status, setStatus] = useState('');

  if (!user) return null;

  const handleUpdatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('');
    if (!currentPassword || !newPassword || !confirmedPassword) {
      setStatus('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmedPassword) {
      setStatus('New passwords do not match.');
      return;
    }
    try {
      await updatePassword(user.token, currentPassword, newPassword);
      setStatus('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmedPassword('');
    } catch (error) {
      console.error('Password update error:', error);
      setStatus('Failed to update password. Please check your current password.');
    }
  };

  const handleDeleteUser = async () => {
    setStatus('');
    try {
      const response = await deleteUser(user.token);
      if (response.ok) {
        auth.logout();
        navigate('/', { replace: true });
      } else {
        setStatus('Server error while deleting account.');
      }
    } catch (error) {
      console.error('Account deletion error:', error);
      setStatus('Failed to delete account. Please try again.');
    }
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt="5rem"
      p={6}
      bg="whiteAlpha.900"
      boxShadow="lg"
      borderRadius="lg"
      fontFamily="heading"
      color="brand.primary"
    >
      <Heading as="h3" size="lg" mb={4} textAlign="center">
        User Profile
      </Heading>

      <VStack spacing={2} align="start" mb={6}>
        <Text fontWeight="bold">Name:</Text>
        <Text>{user.firstName} {user.lastName}</Text>
        <Text fontWeight="bold">Email:</Text>
        <Text>{user.email}</Text>
      </VStack>

      <form onSubmit={handleUpdatePassword}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              bg="white"
              borderColor="brand.primary"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              bg="white"
              borderColor="brand.primary"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              bg="white"
              borderColor="brand.primary"
            />
          </FormControl>

          <HStack spacing={4} pt={2}>
            <Button type="submit" colorScheme="green">
              Save
            </Button>
            <Button colorScheme="red" variant="outline" onClick={handleDeleteUser}>
              Delete Account
            </Button>
          </HStack>
        </VStack>
      </form>

      {status && (
        <Alert status="info" mt={6} borderRadius="md">
          <AlertIcon />
          {status}
        </Alert>
      )}
    </Box>
  );
}

export default UserProfile;