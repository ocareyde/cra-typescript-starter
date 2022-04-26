import { EditionDrop } from '@thirdweb-dev/sdk';
import { BigNumberish } from 'ethers';
import { useState, useEffect } from 'react';

const useEffectCheckBalance = ({ address, editionDrop, tokenId } :
  { address: string | undefined, editionDrop: EditionDrop | undefined, tokenId: BigNumberish }) => {
    
    // State variable for us to know if user has our NFT.
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

    useEffect(() => {
      console.log('useEffect for useEffectCheckBalance');
      // If they don't have a connected wallet, exit! No point in checking balance
      if (!address) {
        return;
      }
      // If they are connected, check their NFT balance
      const checkBalance = async () => {
        try {
          const balance = await editionDrop?.balanceOf(address, tokenId);
          console.log("BALANCE: ", balance?.gt(0));
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
        }
      };
      checkBalance();
    }, [address, editionDrop]);

    // return the dynamic state variables
    return { hasClaimedNFT, setHasClaimedNFT}
}

export default useEffectCheckBalance;