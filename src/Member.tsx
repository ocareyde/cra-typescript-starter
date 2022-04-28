import { useDisconnect } from "@thirdweb-dev/react";
import { EditionDrop, EditionMetadata, Json } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import useEditionDropGetAll from "./useEditionDropGetAll";

const Member = ({ address, memberNFTs } : { address: string, memberNFTs: EditionMetadata[] }) => {
  const disconnectWallet = useDisconnect();

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
                  {/* <td></td> */}
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

export default Member;