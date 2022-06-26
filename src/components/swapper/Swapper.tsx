import { useEffect, useState } from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "../../config";

import "./Swapper.scss";

const sources = ["", "usdc(bep20)"];
const targets = ["", "usdc(erc20)"];

function Swapper() {
  const [state, setState] = useState({ source: "", target: "" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({} as any);
  useEffect(() => {
    async function loadBlockchainData() {
      const web3 = new Web3("http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const _contract = new web3.eth.Contract(
        TODO_LIST_ABI as any,
        TODO_LIST_ADDRESS
      );
      setContract(contract);

      _contract.methods
        .taskCount()
        .call()
        .then((res: any) => console.log(res));
    }
    loadBlockchainData();
  }, [contract]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("start swapping");
  };

  return (
    <div className="swapper">
      <h1>Swapper</h1>
      <form onSubmit={onSubmit}>
        <div className="swapper-list">
          <div>
            <label>
              source:
              <select
                name="source"
                value={state.source}
                onChange={handleChange}
              >
                {sources.map((item: any) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              target:
              <select
                name="target"
                value={state.target}
                onChange={handleChange}
              >
                {targets.map((item: any) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit" value={"submit"}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default Swapper;
