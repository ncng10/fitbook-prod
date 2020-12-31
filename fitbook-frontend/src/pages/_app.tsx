import * as React from "react"

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react"
import "../stylesheets/loginpage.css"
import "../stylesheets/navbars.css"
import "../stylesheets/carousel.css"
function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
