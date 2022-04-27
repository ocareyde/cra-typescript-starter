import { EditionDrop } from '@thirdweb-dev/sdk';
import { BigNumber, BigNumberish } from 'ethers';
import { useState, useEffect } from 'react';

const useEditionDropGetOwned = ({ address, editionDrop }:
  { address: string | undefined, editionDrop: EditionDrop | undefined }) => {

  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // isValidating lets us keep a loading state while checking if validating membership
  const [isValidating, setIsValidating] = useState(false);
  console.log("CHECK 1", isValidating)

  useEffect(() => {
    console.log('useEffect for useEditionDropGetOwned');
    // If they don't have a connected wallet, exit! No point in checking balance
    if (!address) {
      return;
    }
    setIsValidating(true);
    // If they are connected, check their NFT balance
    const getOwned = async () => {
      try {
        console.log("CHECK 2", isValidating)

        const owned = await editionDrop?.getOwned(address);
        const balance = BigNumber.from(owned?.length);
        console.log("Unique Membership NFTs Claimed: ", balance?.gt(0));
        if (balance?.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      } finally {
        setIsValidating(false);
      }
      console.log("CHECK 3", isValidating)
    };
    getOwned();
  }, [address, editionDrop]);

  // return the dynamic state variables
  return { hasClaimedNFT, setHasClaimedNFT, isValidating, setIsValidating }
}

export default useEditionDropGetOwned;