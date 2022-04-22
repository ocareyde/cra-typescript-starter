import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import 'dotenv/config';

// Some quick checks to make sure our .env is working.
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
  console.log("🛑 Private key not found.")
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
  console.log("🛑 Alchemy API URL not found.")
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
  console.log("🛑 Wallet Address not found.")
}

// Instantiate ThirdwebSDK
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
  ),
);

// Return all contracts deployed by the address
(async () => {
  try {
    const contracts = await sdk.getContractList(process.env.WALLET_ADDRESS);
    // const edition = contracts[1];
    // console.log(await edition.metadata());
    const editionDrop = contracts[2];
    const metadata = await editionDrop.metadata();
    const address = editionDrop.address;
    // console.log(contracts)
    console.log(address)
  } catch (err) {
    console.error("Failed to get contracts from the sdk", err);
    process.exit(1);
  }
})();

// Exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;
// export { sdk, address };