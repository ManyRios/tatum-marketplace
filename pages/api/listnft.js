// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"
import FormData from "form-data"
import path from "path"
import fs from "fs"

import { v4 as uuidv4 } from 'uuid'



let contractAd

export default async function handler(req, res) {
  if (req.method === "POST") {
    const signatureId = uuidv4()
  
    const { metadata, metaAccount, price, amount } = req.body;
    const response = await deployNftSm(metadata, metaAccount, price, amount);
  
    res.status(200).json({ message: `well done` });
  } else if (req.method === "GET") {
    const rep = await  getBalance()
    
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
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const deployNftSm = async (meta, seller, price, amount) => {
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


  setTimeout(async () => {
      const metadata = await uploadToIpfs(meta)
      setTimeout(async() => {
        contractAd = await getAddressOfNftSm(data.txId)
        setTimeout(async() => {
         const mint = await mintNft(contractAd, seller, metadata)
          console.log('mint', mint) 
          setTimeout(async () => {
            const listing = await createListing(contractAd, seller, price, amount )
            console.log('listing', listing)
            return listing
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
      tokenId: "100009",
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

const createListing = async (nftAddress, sellerAddress,price, amount) => {

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
    listingId: "100009",
    amount: amount,
    tokenId: "100009",
    price: price,
    isErc721: true,
    fromPrivateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
    fee: {
      gasLimit: '40000',
      gasPrice: '20'
    }
  }),
}
 const res = await fetch(
    `${process.env.NEXT_PUBLIC_TATUM_URL}blockchain/marketplace/listing/sell`,config)
    const data = await res.json();
    console.log(data)
    return data.txId

}

