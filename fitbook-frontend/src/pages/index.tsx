import CreateProgramForm from "../components/CreateProgramForm";
import { NavBar } from "../components/NavBar";
import ProgramMenu from "../components/ProgramMenu";
import { withApollo } from "../utils/withApollo";


function Home() {
  return (
    <div >
      <NavBar />
    </div>
  )
}

export default withApollo({ srr: true })(Home)