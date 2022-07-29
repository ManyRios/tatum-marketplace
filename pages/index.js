import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

import { NftItem } from "../components";

export default function Home() {
  return (
    <Box>
      <Box bgImage={"./patternpad.svg"} h={"36"} mb={10}></Box>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
        <Box
          display={"flex"}
          h={"500px"}
          bgColor={"#183FE1"}
          rounded={"md"}
          boxShadow={"md"}
          p={5}
        >
          <Box color={"white"} p={4}>
            <Box
              as="h1"
              mb={10}
              color={"#FBCC5C"}
              fontWeight={"bold"}
              fontStyle={"normal"}
              fontSize={"36px"}
              lineHeight={"64px"}
              fontFamily={"Roboto"}
            >
              Buy & Sell NFTs
            </Box>

            <Text fontSize={"20px"} fontFamily={"Roboto"} mb={3}>
              Powered by Tatum
            </Text>

            <Box as={"h4"} fontSize={"20px"} fontFamily={"Roboto"} mb={3}>
              Tatum is the fastest way to build, test and run blockchain apps.
            </Box>
            <ButtonGroup
              mt={10 * 2}
              gap="3"
              alignContent={"center"}
              alignItems={"center"}
            >
              <Link href={"./explore"}>
                <Button variant={"solid"} bg={"#2ccd9a"} _hover={{bg: '#FBCC5C', cursor: 'pointer'}}>
                  Explore
                </Button>
              </Link>
              <Link href={"./listnft"}>
                <Button variant={"solid"} bg={"#2ccd9a"} _hover={{bg: '#FBCC5C', cursor: 'pointer'}}>
                  Create
                </Button>
              </Link>
            </ButtonGroup>
          </Box>
        </Box>

        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} p={3} bg={'#FBCC5C'} border={'2px'} rounded={'md'} borderColor={'#FBCC5C'} boxShadow={'md'}>
          <NftItem
            id={1}
            name={"My nFT"}
            height={"20rem"}
            price={"2"}
            image={
              "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
            }
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
