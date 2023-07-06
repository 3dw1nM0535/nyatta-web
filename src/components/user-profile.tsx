import {
  Box,
  Button,
  HStack,
  Icon,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import { FaAngleDown } from "react-icons/fa";

import { useTrackers } from 'hooks'

const UserMenu = ({ ...rest }): JSX.Element => {
  const { data: session, status } = useSession();
  const { trackAction } = useTrackers()

  const handleSignIn = () => {
    trackAction('sign-in')
    signIn("google")
  }

  const handleSignOut = () => {
    trackAction('sign-out')
    signOut()
  }

  const isAuthed = status === 'authenticated'

  return (
    <HStack spacing={4} {...rest}>
      {!isAuthed && (
        <Button onClick={handleSignIn}>Sign In</Button>
      )}
      {isAuthed && (
        <Flex>
          <Menu>
            <MenuButton>
              <HStack>
                <Avatar src={`${session?.user?.image}`} loading="eager" />
                <Box display={{ base: "none", md: "flex" }}>
                  <Icon as={FaAngleDown} />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>{session?.user?.email}</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </HStack>
  );
};

export default UserMenu;
