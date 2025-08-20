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

const TokenPriceChart: React.FC = () => {
  const [data, setData] = useState<PricePoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1"
        );
        const json = await res.json();

        const formattedData: PricePoint[] = json.prices.map((price: [number, number]) => ({
          time: new Date(price[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          value: price[1],
        }));

        

        setData(formattedData);
      } catch (err) {
        console.error("Error fetching token prices:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Ethereum Price (USD)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TokenPriceChart;
