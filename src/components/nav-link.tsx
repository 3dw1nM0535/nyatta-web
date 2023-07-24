import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

const NavLink = ({ link, ...rest }: any) => {
  const { href, label } = link

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
        {/* TODO active link should color.800 */}
        <Text textDecoration="underline" fontSize="1.2em">{label}</Text>
      </Flex>
    </Link>
  )
}

export default NavLink
