
import React, {useState, useEffect } from 'react'

import {Box, Flex, SimpleGrid, Text, Image, Button, VStack, Stack, Tabs } from '@chakra-ui/react'
import { useStateContext } from '../context/StateContext'

import {NftCard} from '../components'


const Listnft = ({props}) => {

  const {imageData, nameImage } = useStateContext()


  let listItemCheck

  return (
    <>
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
            <div style={{ marginBottom: "24px", display: `flex` }}></div>
            <div>
              <NftCard
                fileUpload = {true}
              />
            </div>
            <div style={{ marginTop: "16px" }}>
              <Box
                sx={{
                  display: `flex`,
                  gap: `12px`,
                  alignItems: `center`,
                  marginBottom: `8px`,
                }}
              >
                {!listItemCheck && (
                  <Box
                    sx={{
                      width: `16px`,
                      height: `16px`,
                      borderRadius: `4px`,
                      border: `2px solid rgba(0,0,0,0.3)`,
                      display: `block`,
                    }}
                    _hover={{
                      cursor: `pointer`,
                    }}
                    onClick={() => setListItemCheck(!listItemCheck)}
                  ></Box>
                )}
              </Box>
              <div>
                {listItemCheck && (
                  <Tabs
                    isFitted
                    variant="enclosed"
                    onChange={(e) => setIsAuction(!isAuction)}
                  >
                    <Box mb="1em" w={"80"}>
                      <Text>Fixed Price</Text>
                    </Box>
                    
                  </Tabs>
                )}
                
              </div>
            </div>
          </Stack>
          </Box>
      </SimpleGrid>
    
    </>
  )
}

export default Listnft