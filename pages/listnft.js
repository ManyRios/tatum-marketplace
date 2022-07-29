
import React, {useState, useEffect } from 'react'

import {Box, SimpleGrid, Image, VStack, Stack } from '@chakra-ui/react'
import { useStateContext } from '../context/StateContext'

import {NftCard, LoaderListing} from '../components'


const Listnft = ({props}) => {

  const {imageData, nameImage, listing, setListing } = useStateContext()


  let listItemCheck

  return (
    <>
      {listing ? <LoaderListing isOpens={true} minting={listing} setMinting={setListing}/> : ''}
      <SimpleGrid columns={{sm: 1, md: 2}} spacing={8}>
          <Box position={'relative'}>
          <VStack marginRight="53px" sx={{ position: `sticky`, top: `20px` }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "48px",
                  lineHeight: "64px",
                  color: "black",
                }}
              >
                Mint NFT
              </div>
              <div
                style={{
                  marginTop: "24px",
                  marginBottom: "16px",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "14px",
                  letterSpacing: "1px",
                  color: "#656464",
                }}
              >
                PREVIEW
              </div>
              <Image
                alt=""
                src={imageData ? imageData : undefined}
                w="400px"
                h={ "400px"}
                sx={{
                  objectFit: `cover`,
                }}
                style={{ borderRadius: "4px 4px 0px 0px" }}
              />
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "#000000",
                }}
              >
                {nameImage ? nameImage : "name"}
              </div>
            </VStack>
          </Box>

          <Box>
          <Stack
            spacing="0"
            mb="12.8rem"
            mt={"28"}
            rounded={"md"}
            p={8}
            alignItems={"center"}
            shadow={"md"}
          >
            <Box style={{ marginBottom: "24px", display: `flex` }}></Box>
            <Box>
              <NftCard
                fileUpload = {true}
              />
            </Box>
          </Stack>
          </Box>
      </SimpleGrid>
    
    </>
  )
}

export default Listnft