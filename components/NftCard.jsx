import { Box, Textarea, Input, Text, Button } from "@chakra-ui/react";
import { ImageInput } from "./ImageInput";
import { useStateContext } from "../context/StateContext";

const NftCard = ({ fileUpload }) => {
  const {
    handleUpload,
    file,
    nameNft,
    setNameNft,
    description,
    setdescription,
    price,
    setPrice,
    amount,
    setAmount,
  } = useStateContext();

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
        onChange={(e) => setNameNft(e.target.value)}
        value={nameNft}
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
            <ImageInput isReady={true} inputPlaceholder="Choose your file">
              {file ? "Change File" : "Choose File"}
            </ImageInput>
          }
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
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        required
        sx={{
          fontSize: `14px`,
          width: `clamp(250px, 33vw, 400px)`,
          padding: `16px 16px`,
          margin: `1ex 0`,
          borderRadius: `24px`,
        }}
      />
      <Box
        style={{
          fontSize: "12px",
          lineHeight: "14px",
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "black",
          marginTop: "20px",
        }}
      >
        PRICE
      </Box>
      <Input
        id="price"
        placeholder="Set a CELO price for your NFT"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        required
        sx={{
          fontSize: `14px`,
          width: `clamp(250px, 33vw, 400px)`,
          padding: `24px 16px`,
          margin: `1ex 0`,
          borderRadius: `24px`,
        }}
      />

      <Box
        style={{
          fontSize: "12px",
          lineHeight: "14px",
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "black",
          marginTop: "20px",
        }}
      >
        AMOUNT
      </Box>
      <Input
        id="amount"
        placeholder="Amount of tokens to mint"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        mb={"14"}
        required
        sx={{
          fontSize: `14px`,
          width: `clamp(250px, 33vw, 400px)`,
          padding: `24px 16px`,
          margin: `1ex 0`,
          borderRadius: `24px`,
        }}
      />
      <Box mt={'14'}>
        <Button
          w={"full"}
          bg={"#2ccd9a"}
          color={"white"}
          _hover={{
            bg: "#FBCC5C",
            cursor: "pointer",
            border: "1px",
            borderColor: "#2ccd9a",
            
          }}
          onClick={handleUpload}
        >
          Mint and List NFT
        </Button>
      </Box>
    </Box>
  );
};

export default NftCard;
