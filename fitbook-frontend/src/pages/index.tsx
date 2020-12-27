import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";


function Home() {
  return (
    < div >
      <NavBar />
    </div >
  )
}

export default withApollo({ srr: true })(Home)