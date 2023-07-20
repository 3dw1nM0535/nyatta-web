import { Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';

const NavLink = ({ link, ...rest }: any) => {
  const { href, icon, label } = link

  return (
    <Link href={href}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        _hover={{
          cursor: "pointer",
          color: "green.800",
        }}
        role="group"
        {...rest}
      >
        {icon && (
          <Icon
            fontSize="20"
            mr="2"
            _groupHover={{
              color: "green.800",
            }}
            as={icon}
          />
        )}
        <Text fontSize="1.2em">{label}</Text>
      </Flex>
    </Link>
  )
}

export default NavLink
