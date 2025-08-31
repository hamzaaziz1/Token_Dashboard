import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface PricePoint {
  time: string;
  value: number;
}

const tokens: Record<string, string> = {
  Ethereum: "ethereum",
  Bitcoin: "bitcoin",
  Solana: "solana",
  Polygon: "matic-network",
  Chainlink: "chainlink",
};

const TokenPriceChart: React.FC = () => {
  const [data, setData] = useState<PricePoint[]>([]);
  const [selectedToken, setSelectedToken] = useState<string>("ethereum");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedToken}/market_chart?vs_currency=usd&days=1`
        );
        const json = await res.json();

        const formattedData: PricePoint[] = json.prices.map(
          (price: [number, number]) => ({
            time: new Date(price[0]).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            value: price[1],
          })
        );

        setData(formattedData);
      } catch (err) {
        console.error("Error fetching token prices:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, [selectedToken]); // refetch whenever token changes

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Live {selectedToken.charAt(0).toUpperCase() + selectedToken.slice(1)} Price (USD)
        </h2>

        {/* Token Selector */}
        <select
          className="p-2 border rounded-md"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
        >
          {Object.entries(tokens).map(([name, id]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="35%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0b27c7ff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TokenPriceChart;