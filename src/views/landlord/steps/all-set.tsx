import { Box } from '@chakra-ui/react'
import Link from 'next/link'

const AllSet = (): JSX.Element => (
  <Box>
    Congratulations! We have received your listing. Setup more {' '}
    <Box as="span">
      <Link href="/landlord/setup">property</Link>
    </Box>
  </Box>
)

export default AllSet
