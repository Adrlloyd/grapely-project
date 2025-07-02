import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

interface PasswordModalProps {
  onSubmit: (currentPassword: string, newPassword: string, confirmedPassword: string) => void;
  onCancel: () => void;
}

function PasswordModal({ onSubmit, onCancel }: PasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(currentPassword, newPassword, confirmedPassword);
  };

  return (
    <Modal isOpen={true} onClose={onCancel} isCentered>
      <ModalOverlay />
      <ModalContent
        fontFamily="body"
        bg="white"
        color="brand.primary"
        borderRadius="lg"
        boxShadow="xl"
      >
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{
                    borderColor: 'gold.500',
                    boxShadow: '0 0 0 1px #E6C36F',
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{
                    borderColor: 'gold.500',
                    boxShadow: '0 0 0 1px #E6C36F',
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  placeholder="Confirm new password"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{
                    borderColor: 'gold.500',
                    boxShadow: '0 0 0 1px #E6C36F',
                  }}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="white"
              mr={3}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button colorScheme="purple" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default PasswordModal;