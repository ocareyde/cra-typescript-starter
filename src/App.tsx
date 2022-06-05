import {
  useAddress,
  useChainId,
  useDisconnect,
  useEditionDrop
} from '@thirdweb-dev/react';
import { ChainId } from '@thirdweb-dev/sdk';
import { useEffect, useState } from 'react';
import Connect from './Connect';
import Landing from './Landing';
import Loading from './Loading';
import Main from './Main';
import Member from './Member';
import NonMember from './NonMember';
import UnsupportedNetwork from './UnsupportedNetwork';
import useEditionDropGetAll from './useEditionDropGetAll';
import useEditionDropGetOwned from './useEditionDropGetOwned';

function Content() {
  const address = useAddress();
  console.log('👋 Address:', address);
  const chainId = useChainId();
  const activeChainId = ChainId.Rinkeby;

  const disconnectWallet = useDisconnect();

  // CONTRACTS //
  const memberNFTDrop = useEditionDrop('0x9bfe8A2c0D2451541B71f361F3E5308787A66D2D');
  const tokenId = 1; // 0: OG, 1: Membership

  // STATE VARIABLES //
  // State variable for us to know which channel user wants to view
  // 0: default, no channel
  // 1: member channel
  // 2: sponsor channel
  const [whichChannel, setWhichChannel] = useState(0);

  // Member Channel
  // State variable for us to know if user has our NFT.
  const { hasClaimedNFT, setHasClaimedNFT, isValidating, setIsValidating } =
    useEditionDropGetOwned({ address, editionDrop: memberNFTDrop });
  // Membership NFTs
  const { editionNFTs: memberNFTs, setEditionNFTs: setMemberNFTs } =
    useEditionDropGetAll({
      address,
      editionDrop: memberNFTDrop,
      claimFlag: hasClaimedNFT,
    });

  // FUNCTIONS //
  // Resets after Disconnect
  useEffect(() => {
    if (!address) {
      setWhichChannel(0);
    }
  }, [address]);

  // HTML //

  // If user hasn't connected thier wallet to the dApp ->
  // no need to show any blockchain data, just take them to landing page to connect
  // TODO: maybe button to go back to regular website
  if (!address) {
    return <Connect />;
  }

  // Pop a message if the user is not on Rinkeby
  if (address && chainId !== activeChainId) {
    return <UnsupportedNetwork />;
  }

  // Landing page - choose which channel
  if (address && whichChannel == 0) {
    return <Landing setWhichChannel={setWhichChannel} />;
  }

  // Member Page //
  // Set a Loading State
  if (whichChannel == 1 && isValidating && !hasClaimedNFT) {
    return <Loading />;
  }

  // If user has a Membership NFT, take them to Member Page
  if (whichChannel == 1 && hasClaimedNFT) {
    return <Member address={address} memberNFTs={memberNFTs} />;
  }

  // If user does not have a Membership NFT
  if (whichChannel == 1) {
    return (
      <NonMember
        address={address}
        tokenId={tokenId}
        memberNFTDrop={memberNFTDrop}
        setHasClaimedNFT={setHasClaimedNFT}
      />
    );
  }

  // Sponsor Page
  return (
    <div className="landing">
      <h1>Sponsor Page coming soon!</h1>
      <p></p>
      <>
        <button onClick={disconnectWallet}>Disconnect Wallet</button>
        <p>Your address: {address}</p>
      </>
    </div>
  );
}

export default function App() {
  return (
    <Main>
      <Content />
    </Main>
  );
}
