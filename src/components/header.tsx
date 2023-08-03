import { Flex, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

import UserMenu from "./user-profile";

const Header = ({ onOpen }: any): JSX.Element => (
    <Flex
      position="sticky"
      bg="white"
      px={4}
      top="0"
      h={20}
      alignItems="center"
      zIndex="1"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: "space-between", md: "flex-start" }}
    >
      <Flex display={{ base: "none", md: "flex" }} alignItems="center">
        <Text as={Link} href="/" cursor="pointer" color="green.800" fontSize="4xl" fontWeight="bold">
          Nyatta
        </Text>
      </Flex>
      <IconButton
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
        aria-label="open menu"
        variant="outline"
        icon={<FaBars />}
      />
      <Flex ml="auto">
        <UserMenu />
      </Flex>
    </Flex>
  )

export default Header;
