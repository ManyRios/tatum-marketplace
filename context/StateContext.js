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
  const [amount, setAmount] = useState('');
  const [minting, setMinting] = useState(false)

  const handleClickImage = async () => {
    selectFiles(
      { accept: "image/*", multiple: false },
       ({ name, size, source, file }) => {
        setSize(size);
        setImageData(source);
        setNameImage(name);
        setnftFile(file);
      }
    );
  };

  const reloadCard = () => {
    setSize("");
    setImageData("");
    setNameImage("");
    setnftFile();
    setNameNft('')
    setdescription('')
    setAmount('')
    setPrice('')
  }

  const timerListing = () => {

      setTimeout(() => {
        setListing(false)
        reloadCard()
      }, 8000);
    
  }

  const handleUpload = async () => {

    if(metaAccount){
        
        
    if (nameNft && description && imageData && price && amount) {
      
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
            body: JSON.stringify({ metadata, metaAccount, price, amount }),
          });

          const resSer = await response;
          setListing(true)
          timerListing()
        }
     
    }else{
      alert('Please fill all the required fields')
    }
  }else{
    alert('Please connect your wallet')
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
