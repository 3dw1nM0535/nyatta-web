import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { MdOutlineExplore} from 'react-icons/md'

const linkItems = [
  {label: "Listings", href: '/listings', icon: MdOutlineExplore},
  {label: "Property Owner", href: '/landlord/setup', icon: FaHome},
]

const Sidebar = ({ onClose, ...rest }: any): JSX.Element => (
    <Box
      h="full"
      bg="white"
      transition="3s ease"
      {...rest}
    >
      {linkItems.map((item, index) => (
        <Link key={index} href={`${item.href}`}>
          <Flex
            align="center"
            p={4}
            borderRadius="lg"
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

export default Sidebar;
