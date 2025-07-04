import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  IconButton
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/useAuth';
import { updateName, updatePassword, deleteUser } from '../services/userService';
import NameModal from './Modals/NameModal';
import PasswordModal from './Modals/PasswordModal';
import DeleteModal from './Modals/DeleteModal';

function UserProfile() {

  const { user, login, logout } = useAuth()

  const [activeModal, setActiveModal] = useState<'name' | 'password' | 'delete' | null>(null);

  const navigate = useNavigate(); //To be used for the 'deleteAccount' function - also set {replace:true} as argument to disable return nav through back button
  const [status, setStatus] = useState<string>('');

  if (!user) return null;

    const handleUpdateName = async (firstName: string | undefined, lastName: string | undefined) => {
    setStatus('');
    if (!firstName || !lastName ) {
      setStatus('Please fill in all name fields.');
      return;
    }
    try {
      await updateName(user.token, firstName, lastName);
      login({...user, firstName, lastName})
      setStatus('Name updated successfully.');
      setActiveModal(null);
    } catch (error) {
      console.error(`Oh no, there's a problem updating your name: `, error)
      setStatus('Failed to update name.');
    }
  }

  const handleUpdatePassword = async (currentPassword: string, newPassword: string, confirmedPassword: string) => {
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
      setActiveModal(null);
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
        logout()
        navigate('/', {replace:true});
      } else {
        setStatus('Server error while deleting account.');
      }
    } catch (error) {
      console.error('Account deletion error:', error);
      setStatus('Failed to delete account. Please try again.');
    }
  }

  return (
    <Box position="relative" overflowX="hidden" py="3rem">
      <IconButton
        aria-label="Go Back"
        icon={<ChevronLeftIcon boxSize="1.5rem" />}
        onClick={() => navigate(-1)}
        position="absolute"
        top="1rem"
        left="1rem"
        bg="brand.primary"
        color="whiteAlpha.800"
        borderRadius="full"
        fontSize="1.5rem"
        boxShadow="md"
        zIndex={10}
        _hover={{ bg: 'brand.secondary' }}
      />
      <Box
        maxW="600px"
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
        <VStack fontFamily="body" spacing={2} align="center" mb={6}>
          <Text fontWeight="thin">Name:</Text>
          <Text fontWeight="bold">{user.firstName} {user.lastName}</Text>
          <Text fontWeight="thin">Email:</Text>
          <Text fontWeight="bold">{user.email}</Text>
        </VStack>

        <HStack fontFamily="body"  justify="center" spacing={4} pt={2}>
          <Button w="180px" h="40px" size="sm" onClick={() => setActiveModal('name')}>Update Name</Button>
          <Button w="180px" h="40px" size="sm" onClick={() => setActiveModal('password')}>Change Password</Button>
          <Button w="180px" h="40px" size="sm" onClick={() => setActiveModal('delete')}>Delete Account</Button>
        </HStack>
        {activeModal === 'name' && (
          <NameModal onSubmit={handleUpdateName} onCancel={() => setActiveModal(null)}/>
        )}
        {activeModal === 'password' && (
          <PasswordModal onSubmit={handleUpdatePassword} onCancel={() => setActiveModal(null)}/>
        )}
        {activeModal === 'delete' && (
          <DeleteModal onConfirm={handleDeleteUser} onCancel={() => setActiveModal(null)}/>
        )}
        {status && (
          <Alert status="info" mt={6} borderRadius="md">
            <AlertIcon />
            {status}
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default UserProfile;