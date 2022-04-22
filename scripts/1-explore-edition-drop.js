// import { sdk, address } from './0-initialize-sdk.js';
import sdk from './0-initialize-sdk.js';

// Test Users
const user  = '0x9D8355677D6cd3dbF4D4CEAe7066a3f31C0d295b'
const user1 = '0x712ad77Ef45F4BE5BD41a6a038d6D2bEd66ace04'
const user2 = '0x68c8a89058d8c40a77457eD38DCa049E33C2101A'
const user3 = '0xD8d8845f668A69904693715b506F9eB376C6eD66'

// Edition Drop
// Token ID 0 - OG Member
// Token ID 1 - Membership
const address = '0x9bfe8A2c0D2451541B71f361F3E5308787A66D2D'
const contract = sdk.getEditionDrop(address);
console.log(await contract.metadata.get());
console.log(await contract.claimConditions.getAll(1))


console.log(await contract.claimConditions.canClaim(1, 1, user1))
console.log(await contract.claimConditions.getClaimIneligibilityReasons(1, 1, user1))


console.log(await contract.getAll())


export {}