import { Button, Box } from "@chakra-ui/react";
import React from "react";
import LandingPageUI from "../components/landingpage/LandingPageUI";
import { withApollo } from "../utils/withApollo";


function Home() {
  return (
    <React.Fragment>
      <LandingPageUI />
    </React.Fragment>
  )
}

export default withApollo({ srr: true })(Home)