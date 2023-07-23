import { Box, BoxProps, Flex, Text, CloseButton } from '@chakra-ui/react';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarDesktop = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    w={{base: "full", md: 60}}
    borderRight="1px"
    borderRightColor="gray.200"
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" mx={8} justifyContent="space-between" alignItems="center">
      <Text color="green.800" fontSize="xl" fontWeight="bold">
        Property Selector
      </Text>
      <CloseButton display={{base: "flex", md: "none"}} onClick={onClose} />
    </Flex>
  </Box>
)

export default SidebarDesktop;
