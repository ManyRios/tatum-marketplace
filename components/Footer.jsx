import { Box, Text, Flex, Image } from "@chakra-ui/react";

const Footer = ({ ...rest }) => {
  return (
    <>
      <Box
        w={"100%"}
        flexWrap={"wrap"}
        p={"10"}
        mt={"20"}
        borderTop={"2px"}
        borderColor={'#FBCC5C'}
      >
        <Flex direction={"row"} justify={"space-evenly"} gap={1} flexWrap={'wrap'}>
          <Box>
            <Image alt="tatum" src={"/tatum.svg"} w={"10rem"} h={"36"} />
          </Box>
          
          <Box py={6}>
            <Image alt="celo" src={"celo-logo.png"} w={'48'} h={'24'} />
          </Box>
          
        </Flex>
        <Text textAlign={"center"} fontWeight={'bold'}>Made by Manuel Rios 2022</Text>
      </Box>
    </>
  );
};

export default Footer;