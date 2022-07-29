
import {Box, Textarea, Input, Text, Button } from '@chakra-ui/react'
import {ImageInput} from './ImageInput'
import { useStateContext } from '../context/StateContext'

const NftCard = ({fileUpload}) => {
  
  const { handleUpload, file, setNameNft, setdescription } = useStateContext()

  return (
    <Box className="input-group">
      <Box
        style={{
          fontSize: "12px",
          lineHeight: "14px",
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "black",
        }}
      >
        NAME
      </Box>
      <Input
        id="name"
        placeholder="Name for your NFT"
        onChange={(e)=>setNameNft(e.target.value)}
        
        required
        sx={{
          fontSize: `14px`,
          width: `clamp(250px, 33vw, 400px)`,
          padding: `24px 16px`,
          margin: `1ex 0`,
          borderRadius: `24px`,
        }}
      />
      {fileUpload ? (
        <Box>
          <Box
            sx={{
              fontSize: "12px",
              lineHeight: "14px",
              marginTop: "24px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#656464",
            }}
          >
            Image
          </Box>
          <Box sx={{ height: "16px" }}></Box>
          {
            <ImageInput
             isReady={true}
             inputPlaceholder="Choose yout file"
            >
              {file ? "Change File" : "Choose File"}
            </ImageInput>
          }
          <Box sx={{ height: `16px` }}></Box>
        </Box>
      ) : null}
      <Text
        sx={{
          fontSize: "12px",
          lineHeight: "14px",
          marginTop: "55px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "#656464",
          fontWeight: 600,
        }}
      >
        DESCRIPTION
      </Text>
      <Textarea
        id="description"
        placeholder="Describe your creation"
        onChange={(e)=>setdescription(e.target.value)}
        required
        sx={{
          fontSize: `14px`,
          width: `clamp(250px, 33vw, 400px)`,
          padding: `16px 16px`,
          margin: `1ex 0`,
          borderRadius: `24px`,
        }}
      />
      <Button onClick={handleUpload}>touch Me</Button>
    </Box>
  )
}

export default NftCard