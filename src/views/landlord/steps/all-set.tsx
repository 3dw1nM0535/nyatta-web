import { Box, Text } from '@chakra-ui/react'

import { usePropertyOnboarding } from 'hooks'

const AllSet = (): JSX.Element => {
  const { setStep } = usePropertyOnboarding()

  return (
  <Box>
    Congratulations! We have received your listing. Setup{' '}
    <Box as="span">
      <Text as="span" textDecoration="underline" color="blue.500" cursor="pointer" onClick={() => setStep('description')}>more</Text>
    </Box>{' '}
    property.
  </Box>
)
}

export default AllSet
