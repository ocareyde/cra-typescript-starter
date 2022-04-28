// If user hasn't connected thier wallet to the dApp ->
// no need to show any blockchain data, just take them to landing page to connect
// TODO: maybe button to go back to regular website
import { useMetamask } from "@thirdweb-dev/react";

const Landing = () => {
  const connectWithMetamask = useMetamask();
  
  return (
    <div className="landing">
      <h1>Welcome to NorthStar DAO</h1>
      <button onClick={connectWithMetamask} className="btn-hero">
        Connect with Metamask
      </button>
    </div>
  );
}

export default Landing;