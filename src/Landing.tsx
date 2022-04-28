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