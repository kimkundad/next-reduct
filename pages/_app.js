import React, { Fragment } from 'react'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '@/components/layouts/layout'
import { wrapper } from '../store/store'

function App({ Component, pageProps }) {
  return (
    <Fragment>
        <ChakraProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    </Fragment>
  )
}

export default wrapper.withRedux(App)