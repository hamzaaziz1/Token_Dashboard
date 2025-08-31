import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

const TokenPieChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,matic-network,chainlink"
    )
      .then((response) => response.json())
      .then((tokens) => {
        const formatted: ChartData[] = tokens.map((token: any) => ({
          name: token.symbol.toUpperCase(),
          value: token.market_cap,
        }));
        setData(formatted);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Top Tokens Market Cap</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TokenPieChart;