import Link from "next/link";
import React from "react";

import {
  Box,
  Flex,
  Button,
  Image,
  Text,
  Tag,
  TagLabel,
  Spacer,
} from "@chakra-ui/react";

const NftItem = ({ id, image, name, price, height }) => {
  return (
    <Box border={"1px"} p={3} bg={'white'} borderColor={"#2ccd9a"} rounded={"lg"}>
      <Link href={`/nft/${id}`} passHref>
        <Flex flexWrap="wrap" w="420px" paddingTop="0px" cursor="pointer" justifyContent={'center'}>
          <Box id={id} position={"relative"} alignItems={'center'}>
            <Image
              alt={"imageNft"}
              src={image ? image : ""}
              objectFit={"cover"}
              rounded={"sm"}
              width={400}
              height={260}
            />
          </Box>
          <Box margin="1rem" w={"full"} fontWeight={'semibold'}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mb="1rem"
              
            >
              <Text>{name}</Text>
              <Tag size="md">
                <TagLabel fontSize="md">Fixed Price</TagLabel>
              </Tag>
            </Flex>
            <Flex>
              <Text >Available</Text>

              <Spacer />
              <Image
                align={"vertical"}
                width={"5"}
                height={"8"}
                marginEnd="3px"
                src={"https://cryptologos.cc/logos/celo-celo-logo.svg?v=022"}
                alt={'celo'}
              />
              {price && (
                <Text textAlign="end">
                  {price}
                </Text>
              )}
            </Flex>

            <Box textAlign="center" marginTop={5}>
              <Link href={""} scroll={false}>
                <Button
                  w={"full"}
                  bg={"#2ccd9a"}
                  color={"white"}
                  _hover={{ 
                    bg: "#FBCC5C", 
                    cursor: "pointer", 
                    border: '1px', 
                    borderColor: '#2ccd9a',
                    transition: '10'
                  }}
                  onClick={()=> alert('Button Pressed')}
                >
                  Buy NFT
                </Button>
              </Link>
            </Box>
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};

export default NftItem;
