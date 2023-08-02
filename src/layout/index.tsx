"use client";

import type { ReactNode } from "react";

import { Box, Text, Drawer, DrawerContent, DrawerCloseButton, DrawerHeader, useDisclosure } from "@chakra-ui/react";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ReactGA from 'react-ga4';

import Header from "components/header";
import Sidebar from "components/sidebar-menu";

interface LayoutProps {
  children: ReactNode;
}

if (process.env.NEXT_PUBLIC_ENV === 'production') {
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GA_ID}`);
  ReactGA.event({
    category: "app-loaded",
    action: "load-time",
    value: new Date().getTime(),
  })
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
              <DrawerHeader onClick={() => setTimeout(onClose, 300)} as={Link} href="/" color="green.800">Nyatta</DrawerHeader>
              <Sidebar onClose={onClose} />
            </DrawerContent>
          </Drawer>
        </>
      )}
      <Box>
        {children}
        {pathname !== '/login/user' && (
          <Box w="100%" bottom="0" textAlign="center">
            <Text
              left="0"
              textAlign="center"
              as="a"
              color="green.800"
              href="mailto:lomolo@nyatta.app"
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
      
    </Box>
  )
};

export default Layout;
