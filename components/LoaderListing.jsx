import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  useDisclosure ,
  Text
} from "@chakra-ui/react";

const LoaderListing = ({ minting, hash, isOpens }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal isOpen={isOpens}  onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {minting ? (<Spinner size={'xl'} /> ) : `NFT Minted hash: ${hash}`}
          </ModalBody>

          <ModalFooter fontWeight={'bold'}>
            {minting ? (
              "Minting and listing NFT"
            ) : (
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoaderListing;
