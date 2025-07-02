import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
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
        <ModalHeader>Delete Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={2} fontWeight="bold">
            Are you sure you want to delete your account?
          </Text>
          <Text>This action cannot be undone.</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="white"
            mr={3}
            onClick={onCancel}
          >
            No
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;