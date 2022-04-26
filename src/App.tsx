import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { useEditionDrop } from "@thirdweb-dev/react";
import { EditionMetadata } from '@thirdweb-dev/sdk';
import { useState, useEffect } from 'react';
import EditionDropList from './EditionDropList';
import useEffectCheckBalance from './useEffectCheckBalance';

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  console.log("👋 Address:", address);

  // Contracts
  const memberNFTDrop = useEditionDrop("0x9bfe8A2c0D2451541B71f361F3E5308787A66D2D");
  const tokenId = 1; // 0: OG, 1: Membership

  // // State variable for us to know if user has our NFT.
  // const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // // isClaiming lets us easily keep a loading state while the NFT is minting.
  // const [isClaiming, setIsClaiming] = useState(false);


  const { hasClaimedNFT } = useEffectCheckBalance({ address, editionDrop: memberNFTDrop, tokenId })

  return (
    <div className='landing'>
      <h1>Welcome to NorthStar DAO</h1>
      {address ? (
        <>
          <EditionDropList editionDrop={memberNFTDrop}></EditionDropList>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
}

export default App;
