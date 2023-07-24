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
import { usePathname } from 'next/navigation'
import { useSession, signOut, signIn } from "next-auth/react";

import { trackEvent } from '@ga/analytics'
import MobileNav from 'components/listings-mobile'
import { useTrackers } from 'hooks'

const UserMenu = ({ ...rest }): JSX.Element => {
  const pathname = usePathname()
  const { data: session, status } = useSession();
  const { trackAction } = useTrackers()

  const handleSignIn = () => {
    trackEvent({ action: 'sign-in', category: 'user' })
    trackAction('sign-in')
    signIn("google")
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
              <HStack>
                <Avatar src={`${session?.user?.image}`} loading="eager" />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>{session?.user?.email}</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
          {pathname === "/listings" && <MobileNav display={{ base: "flex", md: "none" }} />}
        </Flex>
      )}
    </HStack>
  );
};

export default UserMenu;
