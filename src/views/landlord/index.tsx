"use client";

import { Container, HStack } from "@chakra-ui/react";

import { Title } from "./components";
import {
  Description,
  Location,
  Units,
  Caretaker,
  PropertyType,
  Shoot,
  AllSet,
} from "./steps";

import { usePropertyOnboarding } from "@hooks";

const Landlord = () => {
  const { step } = usePropertyOnboarding();

  return (
    <Container mb={20}>
      <HStack my={{ base: 4, md: 6 }}>
        <Title />
      </HStack>
      {step === "description" && <Description />}
      {step === "location" && <Location />}
      {step === "units" && <Units />}
      {step === "caretaker" && <Caretaker />}
      {step === "type" && <PropertyType />}
      {step === "shoot" && <Shoot />}
      {step === 'submitted' && <AllSet />}
    </Container>
  );
};

export default Landlord;
