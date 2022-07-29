// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"
import FormData from "form-data"
import path from "path"
import fs from "fs"

import { v4 as uuidv4 } from 'uuid'

//te falta en el front procesar cuando 

let contractAd, deployTxId

export default async function handler(req, res) {
  if (req.method === "POST") {
    const signatureId = uuidv4()
  
    const { metadata, metaAccount } = req.body;
    const response = await deployNftSm(metadata, metaAccount);
    
    console.log(response);
    res.status(200).json({ message: `well done` });
  } else if (req.method === "GET") {
    //const rep = await  getBalance()
    //console.log(rep)
  }
}

const uploadToIpfs = async (file) => {
  fs.writeFileSync("./public/metadata.json", JSON.stringify(file), {
    encoding: "utf8",
  });

  const paths = path.resolve("./public/metadata.json");

  const data = new FormData();
  data.append("file", fs.createReadStream(`${paths}`));

  const config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_TATUM_URL}ipfs`,
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_TATUM_API_KEY,
      ...data.getHeaders(),
    },
    data: data,
  };

  axios(config)
    .then((resp) => {
      const res = resp.data?.ipfsHash;
      console.log(res, "hash");
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const deployNftSm = async (meta, seller) => {
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-testnet-type": "ethereum-ropsten",
      "x-api-key": process.env.NEXT_PUBLIC_TATUM_API_KEY,
    },
    body: JSON.stringify({
      chain: 'CELO',
      name: meta.name,
      provenance: true, //For pays royalties
      cashback: false,
      publicMint: true,
      symbol: "PWRB",
      fromPrivateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      feeCurrency: "CELO",
    })
  }
  try {
   
     
  const res = await fetch(`${process.env.NEXT_PUBLIC_TATUM_URL}nft/deploy`, config)
  const data = await res.json()
  deployTxId = data.txId

  setTimeout(async () => {
      const metadata = await uploadToIpfs(meta)
      setTimeout(async() => {
        contractAd = await getAddressOfNftSm(data.txId)
        setTimeout(async() => {
         const mint = await mintNft(contractAd, seller, metadata)
          console.log('mint', mint) 
          setTimeout(async () => {
            const listing = await createListing(contractAd, seller )
            console.log('listing', listing)
          }, 1000);
        }, 2000);  
      }, 3000);
  }, 4000);


  } catch (error) {
    console.log(error)
  }
  
  
};

const getAddressOfNftSm = async (txId) => {
  
   const res = await fetch(
    `${process.env.NEXT_PUBLIC_TATUM_URL}blockchain/sc/address/CELO/${txId}`,
    {
      method: 'GET',
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_TATUM_API_KEY,
      },
    }
  )
    const data = await res.json()
    console.log(data.contractAddress, 'contract address')
    return data.contractAddress;

};

const mintNft = async (smAddr, account, ipfsUrl) => {

  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-testnet-type": "ethereum-ropsten",
      "x-api-key": process.env.NEXT_PUBLIC_TATUM_API_KEY,
    },
    body: JSON.stringify({
      chain: "CELO",
      tokenId: "100005",
      to: account,
      contractAddress: smAddr,
      url: `ipfs://${ipfsUrl}`,
      authorAddresses: [account],
      provenance: true,
      cashbackValues: ["0.5"],
      fixedValues: ["0.5"],
      fromPrivateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      feeCurrency: "CELO",
    })
  }
    const res = await fetch(`${process.env.NEXT_PUBLIC_TATUM_URL}nft/mint`, config)
    const data = await res.json()
    return data;

};

const createListing = async (nftAddress, sellerAddress) => {
  console.log(sellerAddress, 'nftAddress', process.env.NEXT_PUBLIC_PRIVATE_KEY)
const config = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_TATUM_API_KEY,
  },
  body: JSON.stringify({
    chain: "CELO",
    feeCurrency: "CELO",
    contractAddress: process.env.NEXT_PUBLIC_TATUM_MARKETPLACE_CONTRACT_ADDRESS,
    nftAddress: nftAddress,
    seller: sellerAddress,
    listingId: "100005",
    amount: "1",
    tokenId: "100005",
    price: "2",
    isErc721: true,
    fromPrivateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY
  }),
}
 const res = await fetch(
    `${process.env.NEXT_PUBLIC_TATUM_URL}blockchain/marketplace/listing/sell`,config)
    const data = await res.json();
    console.log(data)
    return data.txId

}

const createMarketPlace = async () => {
  const resp = await axios.post(
    `https://api-eu1.tatum.io/v3/blockchain/marketplace/listing`,
    {
    
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_TATUM_API_KEY,
      },
      body: JSON.stringify({
        chain: "CELO",
        feeRecipient: "0x9525cdd2870bf078d8f6c0a1ee4a4575c6d459dc",
        feeCurrency: "CELO",
        marketplaceFee: 150,
        fromPrivateKey: "0xa067e208dbf54a06970c71132ff936f38013b25829dda89c2e9eecb8251285e6",
      }),
    }
  );

  const data = await resp.json();
  console.log(data);
};
