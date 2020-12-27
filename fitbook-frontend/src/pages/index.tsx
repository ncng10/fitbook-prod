import { Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LandingPageUI from "../components/landingpage/LandingPageUI";
import { useUserProfileQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";


function Home() {

  return (
    <React.Fragment>
      <LandingPageUI />
    </React.Fragment>
  )
}

export default withApollo({ srr: true })(Home)