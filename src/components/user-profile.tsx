import {
  Button,
  HStack,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";

import { trackEvent } from '@ga/analytics'
import { useTrackers } from 'hooks'

const UserMenu = ({ ...rest }): JSX.Element => {
  const { data: session, status } = useSession();
  const { trackAction } = useTrackers()

  const handleSignIn = () => {
    trackEvent({ action: 'sign-in', category: 'user' })
    trackAction('sign-in')
    signIn("google", { callbackUrl: "/listings" })
  }

  const handleSignOut = () => {
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
              <Avatar src={`${session?.user?.image}`} loading="eager" />
            </MenuButton>
            <MenuList>
              <MenuItem>{`${session?.user?.name}`}</MenuItem>
              <MenuItem>{session?.user?.email}</MenuItem>
              <MenuItem textDecoration="underline" onClick={handleSignOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </HStack>
  );
};

export default UserMenu;
