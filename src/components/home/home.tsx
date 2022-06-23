import { useState } from "react";
import { ethers } from "ethers";

function Home() {
  const [data, setData] = useState({
    address: "",
    balance: "",
  });

  const getBalance = (address: string) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance: any) => {
        // Setting balance
        setData((prev) => ({
          ...prev,
          balance: ethers.utils.formatEther(balance),
        }));
      });
  };
  const accountChangeHandler = (account: string) => {
    // Setting an address data
    setData((prev) => ({ ...prev, address: account }));

    // Setting a balance
    getBalance(account);
  };
  const btnHandler = () => {
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${Number(97).toString(16)}`,
            rpcUrls: [
              "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/",
            ],
            chainName: "Ethereum Ropsten Testnet",
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://ropsten.etherscan.io/"],
          },
        ],
      })
      .then((res: any) => {
        // Asking if metamask is already present or not
        if (window.ethereum) {
          // res[0] for fetching a first wallet
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res: any) => accountChangeHandler(res[0]));
        } else {
          alert("install metamask extension!!");
        }
      });
  };
  return (
    <div className="App">
      <strong>Address: </strong>
      {data.address}

      <div>
        <strong>Balance: </strong>
        {data.balance}
      </div>
      {!data.address && !data.balance && (
        <button onClick={btnHandler}>Connect to wallet</button>
      )}
    </div>
  );
}
export default Home;
