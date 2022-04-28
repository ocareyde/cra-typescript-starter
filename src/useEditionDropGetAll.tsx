import { EditionDrop, EditionMetadata } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";

const useEditionDropGetAll = ({ address, editionDrop, claimFlag }:
  { address: string | undefined, editionDrop: EditionDrop | undefined, claimFlag: boolean }) => {

  const [editionNFTs, setEditionNFTs] = useState<EditionMetadata[]>([]);

  useEffect(() => {
    console.log('useEffect for useEffectGetMemberNFTs');
    // If they don't have a connected wallet, exit! No point in retrieving NFTs
    if (!address) {
      return;
    }
    // claimFlag - right now, for Members Page
    if (!claimFlag) {
      return;
    }

    editionDrop?.getAll()
      .then((nfts: any) => {
        setEditionNFTs(nfts)
        console.log("Edition NFTs:", nfts)
      })
      .catch((err: any) => {
        console.error("Failed to get edition NFTs", err);
      })
  }, [address, editionDrop, claimFlag])

  return { editionNFTs, setEditionNFTs }
}

export default useEditionDropGetAll;