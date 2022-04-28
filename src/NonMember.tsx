import { useDisconnect } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import { BigNumberish } from "ethers";
import mintNFT from "./mintNFT"

const NonMember = ({ address, tokenId, memberNFTDrop, isClaiming, setIsClaiming, setHasClaimedNFT }:
  { address: string, tokenId: BigNumberish, memberNFTDrop: EditionDrop | undefined, isClaiming: boolean,
    setIsClaiming: (value: React.SetStateAction<boolean>) => void,
    setHasClaimedNFT: (value: React.SetStateAction<boolean>) => void 
  }) => {

  const disconnectWallet = useDisconnect();

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
            onClick={() => { mintNFT({ editionDrop: memberNFTDrop, tokenId, setIsClaiming, setHasClaimedNFT }) }}
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

export default NonMember;

