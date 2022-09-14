import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { StockChart } from '../components/StockChart';

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

export const StockDetailPage = () => {
  const { symbol } = useParams();
  const [ chartData, setChartData ] = useState();

  useEffect(() => {
    const fetchData = async() => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime()/1000);
      let oneDayAgo;
      if (date.getDay() === 6) {  // if today is Saturday
        oneDayAgo = currentTime - 2 * 24*60*60; // get 2 days back (Friday)
      } else if (date.getDay() === 0) { // if today is Sunday
        oneDayAgo = currentTime - 3 * 24*60*60; // get 3 days back (Friday)
      } else {    // other day
        oneDayAgo = currentTime - 24*60*60; // get one day back of data
      }
      const oneWeekAgo = currentTime - 7 * 24*60*60; // get one week back of data
      const oneYearAgo = currentTime - 365 * 24*60*60; // get one week back of data

      try {
        const responses = await Promise.all([    // paralel request
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDayAgo,
              to: currentTime,
              resolution: 30
            }
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeekAgo,
              to: currentTime,
              resolution: 60
            }
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYearAgo,
              to: currentTime,
              resolution: "W"
            }
          })
        ]);
        console.log(responses);
        setChartData({
          day:formatData(responses[0].data),      // data for day
          week: formatData(responses[1].data),    // data for week
          year: formatData(responses[2].data)    // data for year
        })
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [symbol]);
  
  return <div>
    {chartData && (
      <div>
        <StockChart chartData={chartData} symbol={symbol} />
      </div>
    )}
  </div>
}

// const chartData = {
//   day: "data for one day",
//   week: "data for one week",
//   year: "data for one year"
// }

// each data point shall be like this
// const data = [{x: xValue1, y: yValue1}, {x: xValue2, y: yValue2}, .....]