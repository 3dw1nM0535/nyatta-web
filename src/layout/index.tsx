"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo } from 'react'

import { Box, Container, Center, Drawer, DrawerContent, DrawerCloseButton, DrawerHeader, Text, useDisclosure } from "@chakra-ui/react";
import { Select } from 'chakra-react-select'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ReactGA from 'react-ga4';

import Header from "components/header";
import Sidebar from "components/sidebar-menu";
import { useListings } from 'hooks'
import { chakraStylesConfig } from 'styles'

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
  const { defaultListing, setDefaultListing, listings } = useListings()
  const selectListings = useMemo(() => listings.map((item: any) => ({ label: item.name, value: item.id })), [listings])
  const { isOpen, onClose, onOpen } = useDisclosure();
  const pathname = usePathname()
  const handleSelectListing = (item: any) => {
    setDefaultListing(item)
    onClose()
  }

  useEffect(() => {
    setDefaultListing(selectListings[0])
  }, [selectListings, setDefaultListing])

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
              <Box px={4} mb={10}>
              <Select
                chakraStyles={chakraStylesConfig}
                isSearchable={false}
                options={selectListings}
                onChange={handleSelectListing}
                value={defaultListing}
                selectedOptionStyle="check"
              />
              </Box>
              <Sidebar onClose={onClose} />
            </DrawerContent>
          </Drawer>
        </>
      )}
      <Box>
        {children}
        {pathname === '/' && (
          <Box w="100%">
            <Container as="footer" px={0} py={4} role="contentinfo">
              <Center>
                <Text
                  textAlign="center"
                  fontSize="sm"
                >
                  Contact Us | lomolo@nyatta.app
                </Text>
              </Center>
            </Container>
          </Box>
        )}
      </Box>
    </Box>
  )
};

export default Layout;
