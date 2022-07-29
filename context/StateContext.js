import { createContext, useContext, useState, useEffect } from "react";
import { useFileUpload } from "use-file-upload";
import { useMetamaskContext } from "../context/MetamaskConnect";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [imageData, setImageData] = useState();
  const [size, setSize] = useState("");
  const [nameImage, setNameImage] = useState("");
  const [nameNft, setNameNft] = useState("");
  const [nftFile, setnftFile] = useState(null);
  const [file, selectFiles] = useFileUpload();
  const [description, setdescription] = useState("");
  const { metaAccount } = useMetamaskContext();
  const [listing, setListing] = useState(false)
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')

  const handleClickImage = async () => {
    selectFiles(
      { accept: "image/*", multiple: false },
      async ({ name, size, source, file }) => {
        setSize(size);
        setImageData(source);
        setNameImage(name);
        setnftFile(file);
        console.log(file, nftFile);
      }
    );
  };

  const reloadCard = () => {
    setSize("");
    setImageData("");
    setNameImage("");
    setnftFile(null);
  }

  const timerListing = (response) => {
    if(response){
      setListing(true)
      setTimeout(() => {
        setListing(false)
        reloadCard()
      }, 8000);
    }
  }

  const handleUpload = async () => {
    if (nameNft && description && imageData) {
      if (file) {
        const form = new FormData();
        form.append("file", nftFile);
        const res = await fetch(`${process.env.NEXT_PUBLIC_TATUM_URL}ipfs`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_TATUM_API_KEY,
          },
          method: "POST",
          body: form,
        });
        const data = await res.json();
        if (data) {
          const metadata = {
            name: nameNft,
            description: description,
            image: `ipfs://${data.ipfsHash}`,
          };
          
          const response = await fetch("/api/listnft", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ metadata, metaAccount }),
          });

          const resSer = await response;
        }
      }
    }
  };

  return (
    <Context.Provider
      value={{
        file,
        selectFiles,
        imageData,
        setImageData,
        nameNft,
        setNameNft,
        nameImage,
        setNameImage,
        setdescription,
        nftFile,
        setnftFile,
        file,
        setSize,
        size,
        handleClickImage,
        handleUpload,
        listing,
        setListing,
        price, 
        setPrice,
        amount,
        setAmount
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
