import Link from 'next/link'
import { Box, Text, HStack } from "@chakra-ui/react"


const Logo = (props) => {
  return (
    <HStack spacing={8}>
      <Box {...props}>
        <Link href="/">
          <Box display={'inline-block'}  bg={'#2ccd9a'} textAlign={'center'}  p={1} borderRadius={'md'}> 
            <Text fontSize='lg' fontWeight="bold" _hover={{cursor: 'pointer'}} color={'white'}>
              Tatum Marketplace
            </Text>
          </Box>
        </Link>
      </Box>
    </HStack>
  )
}

export default Logo