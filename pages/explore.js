import React from 'react'
import {Box, Flex } from '@chakra-ui/react'




const explore = ({data}) => {
  return (
    <Box display={'flex'} flex={'wrap'}>
        <h1>
            Hello
        </h1>
       
    </Box>
  )
}

export default explore


/* export async function getStaticProps() {
  const contractAddress = process.env.NEXT_PUBLIC_TATUM_MARKETPLACE_CONTRACT_ADDRESS
  const res = await fetch( `${process.env.NEXT_PUBLIC_TATUM_URL}blockchain/marketplace/listing/CELO/${contractAddress}/INITIATED`, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_TATUM_API_KEY
  }}
  )
  const data = await res.text()
  console.log(data, 'data')
  return {
    props: {
      data: data
    } 
  }
} */