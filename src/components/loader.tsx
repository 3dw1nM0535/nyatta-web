"use client";

import { Center, Spinner } from "@chakra-ui/react";

const Loader = ({ thickness = "8px", size = "xl" }: any): JSX.Element => (
  <Center>
    <Spinner thickness={thickness} color="green.700" size={size} />
  </Center>
);

export default Loader;
