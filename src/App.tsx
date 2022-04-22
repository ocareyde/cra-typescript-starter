import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { useEditionDrop } from "@thirdweb-dev/react";
import { EditionMetadata } from '@thirdweb-dev/sdk';
import { useState, useEffect } from 'react';
import EditionDropList from './EditionDropList';

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  console.log("👋 Address:", address);

  const memberNFTAddress = "0x9bfe8A2c0D2451541B71f361F3E5308787A66D2D";

  return (
    <div className='landing'>
      {address ? (
        <>
          <h1>Welcome to NorthStar DAO</h1>
            <EditionDropList address={memberNFTAddress}></EditionDropList>
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
