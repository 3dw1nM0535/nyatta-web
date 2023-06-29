'use client'

import { AbsoluteCenter, Center, Icon, HStack, Text } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

const Success = (): JSX.Element => (
  <AbsoluteCenter w="100%">
    <Center>
    <HStack spacing={{base: 4, md: 6}}>
    <Icon as={FaCheckCircle} color="green.500" boxSize="6em" />
    <Text fontWeight="bold" fontSize={{base:"2xl", md:"3xl"}}>Congratulation! You will receive updates via email/text.</Text>
    </HStack>
    </Center>
  </AbsoluteCenter>
)

export default Success
