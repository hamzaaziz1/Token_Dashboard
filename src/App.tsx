import React from "react";
import TokenPriceChart from "./components/TokenPriceChart";
import TokenPieChart from "./components/TokenPieChart";

function App() {
  return (
    <div className="App p-6">
      <h1 className="text-2xl font-bold mb-6">Crypto Dashboard</h1>

      <div className="flex justify-between items-start">
        {/* Left side (main chart) */}
        <div className="flex-1">
          <TokenPriceChart />
        </div>

        {/* Right side (pie chart) */}
        <div className="w-1/3 ml-6">
          <TokenPieChart />
        </div>
      </div>
    </div>
  );
}

export default App;
