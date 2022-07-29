
import {useRef, useState, useEffect, forwardRef} from 'react'
import { Input, Box, Text, Button } from '@chakra-ui/react';

import { useStateContext } from '../context/StateContext';


export const  ImageInput = ({isReady, inputPlaceholder, children}) => { 
   
  const{ handleClickImage } = useStateContext()

    const inputRef = useRef()

    
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: `space-between`,
        alignItems: `center`,
        border: `2px solid #405466`,
        borderRadius: '16px',
        width: `clamp(250px, 33vw, 400px)`,
        position: `relative`,
        height: `auto`,
      }}
    >
      <Text sx={{ fontSize: `14px`, opacity: `0.7`, margin: `0 auto` }}>
        {inputPlaceholder}
      </Text>
      <Text
        id="imageInput"
        /* onChange={(e)=>setnftFile(e.target.files[0])} */ 
        sx={{
          display: 'none',
          textAlign: 'right',
          color: '#ffffff',
          fontWeight: 400,
          fontSize: '14px',
          outline: `none`,
          border: `1px solid transparent`,
          borderRadius: `15px 0px 0px 15px`,
          height: `40px`,
          marginRight: `134px`,
        }}
      >
        {inputPlaceholder ? inputPlaceholder : 'Choose a file'}
      </Text>
      <Button
        disabled={!isReady}
        background={isReady ? '#2ccd9a' : '#405466'}
        color={'white'}
        onClick={handleClickImage}
        sx={{
          borderRadius: `0px 16px 16px 0px`,
          borderTop: `2px solid #2ccd9a`,
          borderRight: `2px solid #2ccd9a`,
          borderBottom: `2px solid #2ccd9a`,
          fontSize: '1.8rem',
          height: `40px`,
          width: `134px`,
          transform: `translateX(2px) translateY(-2px)`,
          boxSizing: `content-box`,
          marginLeft: `auto`,
          marginBottom: `-4px`,
        }}
        _hover={{ background: 'black.900', color: 'white.900' }}
        _active={{ background: 'black.900', color: 'white.900' }}
        _disabled={{
          background: '#000000 !important',
        }}
    
      >
        {children}
      </Button>
    </Box>
    );
  }
