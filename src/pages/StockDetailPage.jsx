import { useEffect } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";

export const StockDetailPage = () => {
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async() => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime()/1000);
      const oneDayAgo = currentTime - 24*60*60;
  
      const response = await finnHub.get("/stock/candle", {
        params: {
          symbol,
          from: oneDayAgo,
          to: currentTime,
          resolution: 30
        }
      })
      console.log(response)
    };
    fetchData();
  }, []);
  
  return <div>Stock Detail Page: {symbol}</div>
}