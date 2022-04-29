import { useDisconnect } from "@thirdweb-dev/react";

const Landing = ({setWhichChannel} : { setWhichChannel: (value: React.SetStateAction<number>) => void}) => {
  const disconnectWallet = useDisconnect();

  const handleClick = (channel: number) => {
    setWhichChannel(channel);
  }

  return (
    <div className="landing">
      <h1>What brings you here?</h1>
      
      <div className="flex-container">
        <div className="flex-child">
          <button onClick={() => handleClick(2)}>Sponsor Page</button>
        </div>
        <div className="flex-child">
          <button onClick={() => handleClick(1)}>Member Page</button>
        </div>
      </div>
      
      <p></p>
      <p></p>
      <>
        <button onClick={disconnectWallet}>Disconnect Wallet</button>
      </>
    </div>
  )
}

export default Landing;