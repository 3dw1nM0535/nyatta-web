"use client";

import { PropsWithChildren } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import NavLink from 'components/nav-link'

const linkItems = [
  { label: "Overview", href: "/overview" },
  { label: "Units", href: "/units" },
  { label: "Tenants", href: "/tenants" },
]

const Layout = ({ children }: PropsWithChildren) => (
  <Box
    transition="3s ease"
  >
    <Flex
      justifyContent="center"
      mb={5}
    >
      {linkItems.map((link, index) => (
        <NavLink key={index} link={link} />
      ))}
    </Flex>
    {children}
  </Box>
);

export default Layout
