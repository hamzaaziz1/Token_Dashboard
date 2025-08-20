import React from "react";
import TokenPriceChart from "./components/TokenPriceChart";

function App() {
  return (
    <div className="App p-6">
      <h1 className="text-2xl font-bold mb-6">Crypto Dashboard</h1>
      <TokenPriceChart />
    </div>
  );
}

export default App;
