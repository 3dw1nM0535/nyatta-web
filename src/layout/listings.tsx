"use client";

import { PropsWithChildren } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { FaUsers } from 'react-icons/fa'
import { MdGridView, MdOutlineBroadcastOnHome } from 'react-icons/md'

import NavLink from 'components/nav-link'

const linkItems = [
  { label: "Overview", href: "/overview", icon: MdOutlineBroadcastOnHome },
  { label: "Units", href: "/units", icon: MdGridView },
  { label: "Tenants", href: "/tenants", icon: FaUsers },
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
