import { useEditionDrop } from "@thirdweb-dev/react";
import { EditionMetadata } from "@thirdweb-dev/sdk";
import { useState, useEffect } from "react";


const EditionDropList = ({ address } : { address: any}) => {
  // get an instance of contract
  const editionDrop = useEditionDrop(address);

  const [nfts, setNfts] = useState<EditionMetadata[]>([]);

  useEffect(() => {
    console.log('useEffect for EditionDropList');
    if (editionDrop) {
      // call functions on contract
      editionDrop
        .getAll()
        .then((nfts) => {
          setNfts(nfts);
        })
        .catch((error) => {
          console.error("failed to fetch nfts", error);
        });
    }
  }, [editionDrop]); // any time editionDrop changes, call useEffect

  return (
    <div>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.metadata.id.toString()}>{nft.metadata.name}</li>
        ))}
      </ul>
    </div>
  );

}

export default EditionDropList;