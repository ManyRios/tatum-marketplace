import React from 'react'
import {Box, Flex } from '@chakra-ui/react'




const explore = ({data}) => {
  return (
    <Box >
        <h1>
            Explore the last NFT
        </h1>
        <Box display={'flex'} flex={'wrap'}>


        </Box>
       
    </Box>
  )
}

export default explore


export async function getServerSideProps() {
  const contractAddress = process.env.NEXT_PUBLIC_TATUM_MARKETPLACE_CONTRACT_ADDRESS
  const res = await fetch( `${process.env.NEXT_PUBLIC_TATUM_URL}blockchain/marketplace/listing/CELO/${contractAddress}/INITIATED`, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_TATUM_API_KEY
  }}
  )
  const data = await res.text()
    setTimeout(() => {
      
    }, 2000);
  return {
    props: {
      data: data
    } 
  }
} 