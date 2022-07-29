import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from "react";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import {
  Box,
  Flex,
  Text,
  Button,
  Stack
} from "@chakra-ui/react";

import Logo from "./Logo";
import { useMetamaskContext } from '../context/MetamaskConnect'

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props} borderBottom={'2px'} borderColor={'#FBCC5C'} fontFamily={'Roboto'}>
      <Logo
        w="150px"
        mb={2}
        color={["black", "black", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};


const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </Box>
  );
};

const  MenuItem = ({ children, isLast, to = "/", ...rest }) => {



  return (
    <Link href={to}>
      <Text
        display="block"
        {...rest}
        _selected={{
          color: "white",
          bg: "#2ccd9a",
          rounded: "md",
        }}
        _hover={{
          cursor: "pointer",
          color: "white",
          bg: "#2ccd9a",
          rounded: "md",
        }}
      >
        {children}
      </Text>
    </Link>
  );
}

const MenuLinks = ({ isOpen }) => {

  const {metaAccount, connect, connectMetamask, disconnectMetamask } = useMetamaskContext();

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        fontWeight={'bold'}
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/" p="2">
          Home
        </MenuItem>
        <MenuItem to="/explore" p="2">
          Explore{" "}
        </MenuItem>
        <MenuItem to="/listnft" p="2">
          List NFT{" "}
        </MenuItem>
        <MenuItem to=" " isLast>
          <Button
            size="sm"
            rounded="md"
            color={"black"}
            bg={"transparent"}
            outlineColor={"#2ccd9a"}
            onClick={connect ? disconnectMetamask : connectMetamask}
            _hover={{
              color: "white",
              bg: "#2ccd9a",
            }}
          >
            {metaAccount ? metaAccount : "Connect Metamask"}
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
     
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={'white'}
      color={["black", "black", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};



export default Navbar