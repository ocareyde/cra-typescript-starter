import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { useEditionDrop } from "@thirdweb-dev/react";
import { EditionMetadata } from '@thirdweb-dev/sdk';
import { useState, useEffect } from 'react';

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  console.log("👋 Address:", address);


  const test = false;


// const NFTListComponent = () => {
  // get an instance of your own contract
  const editionDrop = useEditionDrop("0x9bfe8A2c0D2451541B71f361F3E5308787A66D2D");

  const [nfts, setNfts] = useState<EditionMetadata[]>([]);

  useEffect(() => {
    console.log('useEffect for EditionDropListComponent');
    if (editionDrop) {
      // call functions on your contract
      editionDrop
        .getAll()
        .then((nfts) => {
          setNfts(nfts);
        })
        .catch((error) => {
          console.error("failed to fetch nfts", error);
        });
    }
  }, [editionDrop]);

  if (test) {
    return (
      <div className="landing">
        <h1>Welcome to NorthStar DAO</h1>
        <ul>
          {nfts.map((nft) => (
            <li key={nft.metadata.id.toString()}>{nft.metadata.name}</li>
          ))}
        </ul>
      </div>
      
    );
  }

  
// };


  return (
    <div className='landing'>
      {address ? (
        <>
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
