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

  // CONTRACTS //
  const memberNFTDrop = useEditionDrop("0x9bfe8A2c0D2451541B71f361F3E5308787A66D2D");
  const tokenId = 1; // 0: OG, 1: Membership

  // // State variable for us to know if user has our NFT.
  // const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // // isClaiming lets us easily keep a loading state while the NFT is minting.
  // const [isClaiming, setIsClaiming] = useState(false);


  // State variable for us to know if user has our NFT.
  const { hasClaimedNFT, setHasClaimedNFT } = useEffectCheckBalance({ address, editionDrop: memberNFTDrop, tokenId })
  // isClaiming lets us keep a loading state while the NFT is minting
  const [isClaiming, setIsClaiming] = useState(false);

  // Function to mint an NFT upon some user event
  const mintNFT = async () => {
    try {
      setIsClaiming(true);
      await memberNFTDrop?.claim(tokenId,1);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${memberNFTDrop?.getAddress()}/0`);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  }



  // HTML //
  // If user hasn't connected thier wallet to the dApp ->
  // no need to show any blockchain data, just take them to landing page to connect
  // TODO: maybe button to go back to regular website
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to NorthStar DAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect with Metamask
        </button>
      </div>
    );
  }

  // Connected User
  // If user has a Membership NFT, take them to Member Page
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>NorthStar DAO Member Page</h1>
        <p>Thanks for being a member and taking part in the future of organized groups!</p>
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
        </>
      </div>
    )
  }

  // If user does not have a Membership NFT
  return (
    <div className="mint-nft">
      <h1>You are not a NorthStar DAO Member!</h1>
      <h2>To become a member, you must:</h2>
        <ol style={{
          fontSize: "1.3rem"
        }}>
          <li>Sign the&nbsp;
            <a href="https://form.jotform.com/202965794550162" target="_blank" rel="noopener noreferrer" style={{
              textDecoration: "underline",
              color: "white"
            }}>
              waiver
            </a>
          </li>
          {/* <li>Mint a membership NFT</li> */}
          <li>
            <button
              disabled={isClaiming}
              onClick={mintNFT}
            >
              {isClaiming ? "Minting..." : "Mint your membership NFT (FREE)"}
            </button>
          </li>
        </ol>
      <p></p>
      <>
          <button disabled={isClaiming} onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
      </>
    </div>
  )
}

export default App;
