

export const getListings = async () => {
const contractAddress = process.env.NEXT_PUBLIC_TATUM_MARKETPLACE_CONTRACT_ADDRESS
  const res = await fetch( `${process.env.NEXT_PUBLIC_TATUM_URL}blockchain/marketplace/listing/CELO/${contractAddress}/INITIATED`, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_TATUM_API_KEY
  }}
  )
  const data = await res.text()
  return data
}