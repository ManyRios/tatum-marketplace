import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StateContext } from '../context/StateContext'
import { MetamaskConnect } from '../context/MetamaskConnect'

import {Layout} from '../components'

function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider>
      <MetamaskConnect>
        <StateContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateContext>
      </MetamaskConnect>
    </ChakraProvider>
  ) 
}

export default MyApp
