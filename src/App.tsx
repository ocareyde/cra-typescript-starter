import { useAddress, useChainId, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { useEditionDrop } from "@thirdweb-dev/react";
import { ChainId, EditionMetadata } from '@thirdweb-dev/sdk';
import { useState, useEffect } from 'react';
import Connect from './Connect';
import Landing from './Landing';
import Loading from './Loading';
import Member from './Member';
import NonMember from './NonMember';
import UnsupportedNetwork from './UnsupportedNetwork';
import useEditionDropGetAll from './useEditionDropGetAll';
import useEditionDropGetOwned from './useEditionDropGetOwned';

function App() {
  const address = useAddress();
  console.log("👋 Address:", address);
  const chainId = useChainId();
  const activeChainId = ChainId.Rinkeby;

  // CONTRACTS //
  const memberNFTDrop = useEditionDrop("0x9bfe8A2c0D2451541B71f361F3E5308787A66D2D");
  const tokenId = 1; // 0: OG, 1: Membership


  // STATE VARIABLES //
  // State variable for us to know which channel user wants to view
  // 0: default, no channel
  // 1: member channel
  // 2: sponsor channel
  const [ whichChannel, setWhichChannel ] = useState(0)
  
  // Member Channel
  // State variable for us to know if user has our NFT.
  const { hasClaimedNFT, setHasClaimedNFT, isValidating, setIsValidating } = useEditionDropGetOwned({ address, editionDrop: memberNFTDrop })
  // isClaiming lets us keep a loading state while the NFT is minting
  const [isClaiming, setIsClaiming] = useState(false);
  // Membership NFTs
  const { editionNFTs: memberNFTs, setEditionNFTs: setMemberNFTs } = useEditionDropGetAll({ address, editionDrop: memberNFTDrop, claimFlag: hasClaimedNFT })


  // FUNCTIONS //

  // HTML //

  // If user hasn't connected thier wallet to the dApp ->
  // no need to show any blockchain data, just take them to landing page to connect
  // TODO: maybe button to go back to regular website
  if (!address) {
    return (
      <Connect/>
    ) 
  }

  // Pop a message if the user is not on Rinkeby
  if (address && chainId !== activeChainId) {
    return (
      <UnsupportedNetwork/>
    )
  }

  // Landing page - choose which channel
  if (address && whichChannel == 0) {
    return (
      <Landing setWhichChannel={setWhichChannel}/>
    )
  }

  // Member Page //
  // Set a Loading State
  if (isValidating && !hasClaimedNFT) {
    return (
      <Loading/>
    )
  }

  // If user has a Membership NFT, take them to Member Page
  if (hasClaimedNFT) {
    return (
      <Member address={address} memberNFTs={memberNFTs}/>
    )
  }

  // If user does not have a Membership NFT
  return (
    <NonMember address={address} tokenId={tokenId} memberNFTDrop={memberNFTDrop}
      isClaiming={isClaiming} setIsClaiming={setIsClaiming} setHasClaimedNFT={setHasClaimedNFT}
    />
  )
}

export default App;
