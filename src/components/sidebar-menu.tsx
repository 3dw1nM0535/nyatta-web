import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome } from 'react-icons/fa'

const linkItems = [
  {label: "Property Owner", href: '/property/setup', icon: FaHome},
]

const Sidebar = ({ onClose, ...rest }: any): JSX.Element => {
  const pathname = usePathname()

  return (
    <Box
      h="full"
      bg="white"
      transition="3s ease"
      {...rest}
    >
      {linkItems.map((item, index) => (
        <Link onClick={() => setTimeout(onClose, 300)} key={index} href={`${item.href}`}>
          <Flex
            align="center"
            p={4}
            borderRadius="lg"
            bg={pathname === item.href ? "green.700" : "white"}
            color={pathname === item.href ? "white" : "black"}
            mx={4}
            _hover={{
              bg: "green.700",
              color: "white",
            }}
            cursor="pointer"
          >
            {item.icon && (
              <Icon
                mr={4}
                fontSize="16"
                as={item.icon}
              />
            )}
            <Text>{item.label}</Text>
          </Flex>
          
        </Link>
      ))}
    </Box>
  )
}
export default Sidebar;
