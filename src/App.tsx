import { useAddress, useChainId, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { useEditionDrop } from "@thirdweb-dev/react";
import { ChainId, EditionMetadata } from '@thirdweb-dev/sdk';
import { useState, useEffect } from 'react';
import EditionDropList from './EditionDropList';
import useEditionDropGetOwned from './useEditionDropGetOwned';
import useEffectCheckBalance from './useEffectCheckBalance';

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  console.log("👋 Address:", address);
  const chainId = useChainId();

  // CONTRACTS //
  const activeChainId = ChainId.Rinkeby;
  const memberNFTDrop = useEditionDrop("0x9bfe8A2c0D2451541B71f361F3E5308787A66D2D");
  const tokenId = 1; // 0: OG, 1: Membership

  console.log(chainId)
  console.log(activeChainId)


  // STATE VARIABLES //
  // State variable for us to know if user has our NFT.
  const { hasClaimedNFT, setHasClaimedNFT, isValidating, setIsValidating } = useEditionDropGetOwned({ address, editionDrop: memberNFTDrop })
  // isClaiming lets us keep a loading state while the NFT is minting
  const [isClaiming, setIsClaiming] = useState(false);
  // Membership NFTs
  const [memberNFTs, setMemberNFTs] = useState<EditionMetadata[]>([]);

  useEffect(() => {
    console.log('useEffect for useEffectGetMemberNFTs');
    // If they don't have a connected wallet, exit! No point in retrieving NFTs
    if (!address) {
      return;
    }
    // If they are not a member, exit!
    if (!hasClaimedNFT) {
      return;
    }

    memberNFTDrop?.getAll()
      .then((nfts) => {
        setMemberNFTs(nfts)
        console.log("Membership NFTs:", nfts)
      })
      .catch((err) => {
        console.error("Failed to get membership NFTs", err);
      })
  }, [address, hasClaimedNFT])



  // FUNCTIONS //
  // Function to mint an NFT upon some user event
  const mintNFT = async () => {
    try {
      setIsClaiming(true);
      await memberNFTDrop?.claim(tokenId,1);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${memberNFTDrop?.getAddress()}/${tokenId}`);
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

  // Pop a message if the user is not on Rinkeby
  if (address && chainId != activeChainId) {
    return (
      // <>
      <div className="unsupported-network">
        <h2>Please connect to Rinkeby</h2>
        <p>
          This dapp only works on the Rinkeby network, please switch networks
          in your connected wallet.
        </p>
        <button onClick={disconnectWallet}>Disconnect Wallet</button>
      </div>
      // </>
    );
  }

  // Set a Loading State
  if (isValidating) {
    return (
      <div className="landing">
        <h1>Validating Membership</h1>
      </div>
    )
  }

  // Connected User
  // If user has a Membership NFT, take them to Member Page
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>NorthStar DAO Member Page</h1>
        <h2>Thanks for being a member and taking part in the future of organized groups!</h2>
        <p></p>
        <div>
          <table className="card" style={{
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            <thead>
              <tr>
                <th>Token Id</th>
                <th>Media</th>
                <th>Name</th>
                <th>Description</th>
                {/* <th>Properties</th> */}
                <th>Claimed Supply</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {memberNFTs.map((memberNFT) => {
                return (
                  <tr key={memberNFT.metadata.id.toString()}>
                    <td>{memberNFT.metadata.id.toString()}</td>
                    <td>
                      <img
                        src={memberNFT.metadata.image}
                        width= "100%"
                        height= "auto"
                        style={{
                          objectFit: "scale-down"
                      }}></img>
                    </td>
                    <td>{memberNFT.metadata.name}</td>
                    <td>{memberNFT.metadata.description}</td>
                    <td>{memberNFT.supply.toString()}</td>
                    <td>THIS IS WHERE MINT AND BURN BUTTONS WILL GO</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p></p>
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
