import { createContext, useContext, useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid'

const MetamaskContext = createContext();



export const MetamaskConnect = ({children}) => {
    const [metaAccount, setMetaAccount] = useState("")
    const [connect, setConnect] = useState(false)
    const [chain, setChain] = useState()
    const [signer, setSigner] = useState()

    const connectMetamask = async () => {
        const accounts = await window.ethereum
          .request({
            method: "wallet_requestPermissions",
            params: [
              {
                eth_accounts: {},
              },
            ],
          })
          .then(() => window.ethereum.request({ method: "eth_requestAccounts" }))
        const account = accounts[0]
        console.log("Account", account)
        setMetaAccount(account)
        return account
      }
    
     /**
      * When the user clicks the button, the function disconnectMetamask is called, which sets the state of
      * the connect variable to false and the state of the metaAccount variable to an empty string.
      */
      const disconnectMetamask = async () => {
        setConnect(false)
        setMetaAccount("")
      };
    
      useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
          window.ethereum.on("accountsChanged", (accounts) => {
            setMetaAccount(accounts[0])
          });
    
          window.ethereum.on("chainChanged", (chainId) => {
            setChain(chainId)
          });
        } else {
          console.log("Please Install metamask")
        }
    
        setConnect(metaAccount ? true : false);
      }, [metaAccount]);
    

  return (
    <MetamaskContext.Provider
        value={{ 
            metaAccount, 
            setMetaAccount,
            connect,
            setConnect,
            chain, 
            setChain,
            connectMetamask,
            disconnectMetamask
        }}
    >
    
    {children}
    </MetamaskContext.Provider>
  )
}

export const useMetamaskContext = () => useContext(MetamaskContext);