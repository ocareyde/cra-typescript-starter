// Function to mint an NFT upon some user event
import { EditionDrop } from "@thirdweb-dev/sdk";
import { BigNumberish } from "ethers";

const mintNFT = async ({ editionDrop, tokenId, setIsClaiming, setHasClaimedNFT }:
  { editionDrop: EditionDrop | undefined,
    tokenId: BigNumberish,
    setIsClaiming: (value: React.SetStateAction<boolean>) => void,
    setHasClaimedNFT: (value: React.SetStateAction<boolean>) => void }) => {
  
  try {
    setIsClaiming(true);
    await editionDrop?.claim(tokenId, 1);
    console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop?.getAddress()}/${tokenId}`);
    setHasClaimedNFT(true);
  } catch (error) {
    setHasClaimedNFT(false);
    console.error("Failed to mint NFT", error);
  } finally {
    setIsClaiming(false);
  }
}

export default mintNFT;