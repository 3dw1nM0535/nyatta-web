import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsBuildingFillAdd } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import { MdOutlineExplore} from 'react-icons/md'

const linkItems = [
  { label: "Overview", href: "/listings", icon: FaHome },
  { label: "Units", href: "/listings/units", icon: MdOutlineExplore },
  { label: "Add", href: "/listings/setup", icon: BsBuildingFillAdd },
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
        <Link onClick={onClose} key={index} href={`${item.href}`}>
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
                fontSize={16}
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
