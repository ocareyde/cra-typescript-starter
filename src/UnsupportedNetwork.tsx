import { useDisconnect } from "@thirdweb-dev/react";

const UnsupportedNetwork = () => {
  const disconnectWallet = useDisconnect();
  
  return (
    <div className="unsupported-network">
      <h2>Please connect to Rinkeby</h2>
      <p>
        This dapp only works on the Rinkeby network, please switch networks
        in your connected wallet.
      </p>
      <button onClick={disconnectWallet}>Disconnect Wallet</button>
    </div>
  );
}

export default UnsupportedNetwork;
