import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import finnHub from '../apis/finnHub';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { useWatchList } from '../context/watchListContext'

export const StockList = () => {
  const [ stock, setStock ] = useState()
  const { watchList, deleteStock } = useWatchList();
  const navigate = useNavigate();

  const changeColor = (data) => {
    return data > 0 ? "success" : "danger"
  }

  const changeArrow = (data) => {
    return data > 0 ? <BiUpArrow /> : <BiDownArrow />
  }

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }
  
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map(stock => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock
              }
            })
          })
        );
        
        // console.log(responses);
        const data = responses.map(response => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        });
        // console.log(data);
        if (isMounted) setStock(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    
    return () => (isMounted = false)
  },[watchList]);

  
  return <div>
    <table className='table hover mt-5'>
      <thead style={{color: "rgb(79, 89, 102)"}}>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Chg</th>
          <th scope="col">Chg%</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Open</th>
          <th scope="col">PClose</th>
        </tr>
      </thead>
      <tbody>
        {stock && stock.map((stockData) => {
          return (
            <tr 
              className='table-row' 
              key={stockData.symbol}
              onClick={() => handleStockSelect(stockData.symbol)}
              style={{cursor: "pointer"}}
            >
              <th scope="row">{stockData.symbol}</th>
              <td>{stockData.data.c}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>
                {stockData.data.d}{changeArrow(stockData.data.d)}
              </td>
              <td className={`text-${changeColor(stockData.data.dp)}`}>
                {stockData.data.dp}{changeArrow(stockData.data.dp)}
              </td>
              <td>{stockData.data.h}</td>
              <td>{stockData.data.l}</td>
              <td>{stockData.data.o}</td>
              <td>
                {stockData.data.pc} 
                <button 
                  className="btn btn-danger btn-sm mx-3 d-inline-block delete-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteStock(stockData.symbol)
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
}