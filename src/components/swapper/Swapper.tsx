import { useState } from "react";

import "./Swapper.scss";

const sources = ["", "usdc(bep20)"];
const targets = ["", "usdc(erc20)"];

function Swapper() {
  const [state, setState] = useState({ source: "", target: "" });
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
