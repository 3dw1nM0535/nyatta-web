import { BoxProps, CloseButton, Drawer, DrawerContent, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

const MobileNav = ({ ...rest }: BoxProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        autoFocus={false}
        placement="right"
        returnFocusOnClose={false}
      >
        <DrawerContent>
          <Flex mx={4} p={4} alignItems="center" justifyContent="space-between">
            <Text>Drawer Content</Text>
            <CloseButton display={{base: "flex", md: "none"}} onClick={onClose} />
          </Flex>
          
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default MobileNav
