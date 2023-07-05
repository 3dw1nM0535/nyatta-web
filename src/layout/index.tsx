"use client";

import type { ReactNode } from "react";

import { Box, Text, Drawer, DrawerContent, DrawerCloseButton, DrawerHeader, useDisclosure } from "@chakra-ui/react";
import { usePathname } from 'next/navigation'

import Header from "components/header";
import Sidebar from "components/sidebar-menu";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const pathname = usePathname()

  return (
    <Box minH="100vh" bg="white">
      {pathname !== '/login/user' && (
        <>
          <Header onOpen={onOpen} />
          <Drawer
            placement="left"
            isOpen={isOpen}
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
          >
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader color="green.800">Nyatta</DrawerHeader>
              <Sidebar onClose={onClose} />
            </DrawerContent>
          </Drawer>
        </>
      )}
      <Box p={4}>{children}</Box>
      {pathname !== '/login/user' && (
        <Box bottom="0" h={10} bg="white" left="0" w="100%" textAlign="center" position="fixed">
          <Text
            as="a"
            color="green.800"
            href="mailto:edwinmoses535@gmail.com"
            _hover={{
              cursor: "pointer",
            }}
            textDecoration="underline"
          >
            Contact Us
          </Text>
        </Box>
      )}
    </Box>
  )
};

export default Layout;
