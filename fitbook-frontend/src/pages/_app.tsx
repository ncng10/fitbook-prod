import * as React from "react"

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react"
import "../stylesheets/loginpage.css"
function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
