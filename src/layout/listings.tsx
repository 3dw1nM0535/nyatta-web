"use client";

import { PropsWithChildren } from 'react'

import { Box, useDisclosure, Drawer, DrawerContent } from '@chakra-ui/react'

import SidebarDesktop from 'components/sidebar-desktop'

const linkItems = [
  { label: "Overview", href: "/listings" },
  { label: "Units", href: "/units" },
  { label: "Tenants", href: "/tenants" },
]

const Layout = ({ children }: PropsWithChildren) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <SidebarDesktop
        onClose={onClose}
        display={{ base: "none", md: "block" }} 
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        placement="left"
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        autoFocus={false}
      >
        <DrawerContent>
          <SidebarDesktop onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{base: 0, md: 60}} p={4}>
        {children}
      </Box>
    </Box>
  )
};

export default Layout
