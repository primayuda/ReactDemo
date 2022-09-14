import { useState } from 'react';
import Chart from 'react-apexcharts';

export const StockChart = ({chartData, symbol}) => {
  const { day, week, year } = chartData;
  const [dateFormat, setDateFormat] = useState("24h");

  const determineDateFormat = () => {
    const formatOptions = {
      "24h": day,
      "7d": week,
      "1y": year
    }
    return formatOptions[dateFormat]
  };

  const color = determineDateFormat()[determineDateFormat().length - 1].y - determineDateFormat()[0].y > 0 ? "#26C281" : "#ED3419"
  
  
  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "ddd MMM HH:MM"
      }
    }
  }
  
  const series = [{
    name: symbol,
    data: determineDateFormat()
  }]

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 "
    if (button === dateFormat) {
      return classes + "btn-primary"
    } else {
      return classes + "btn-outline-primary"
    }
  }
  
  return <div  
           className='mt-5 p-4 shadow-sm background-white'
          >
    <Chart 
      options={options}
      series={series}
      type="area"
      width="100%"
    />
    <div>
      <button 
        onClick={() => setDateFormat("24h")}
        className={renderButtonSelect("24h")}
      >
        24h
      </button>
      <button 
        onClick={() => setDateFormat("7d")}
        className={renderButtonSelect("7d")}
      >
        7d</button>
      <button 
        onClick={() => setDateFormat("1y")}
        className={renderButtonSelect("1y")}
      >
        1y
      </button>
    </div>
  </div>
}