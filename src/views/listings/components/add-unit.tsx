import { Button, Modal, ModalContent, ModalBody, ModalFooter, ModalOverlay } from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddUnit = ({ isOpen, onClose }: Props) => (
  <Modal motionPreset="slideInBottom" isCentered size="sm" isOpen={isOpen} onClose={onClose}>
    <ModalOverlay
      backdropFilter="auto"
      bg="none"
      backdropInvert="80%"
      backdropBlur="2px"
    />
    <ModalContent>
      <ModalBody>
        Add unit
      </ModalBody>
      <ModalFooter>
        <Button size="sm">Add</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export default AddUnit
