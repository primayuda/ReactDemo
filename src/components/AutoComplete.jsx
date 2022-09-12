import { useState, useEffect } from "react";
import finnHub from '../apis/finnHub';
import { useWatchList } from '../context/watchListContext';

export const AutoComplete = () => {
  const [ search, setSearch ] = useState("");
  const [ results, setResults ] = useState([]);
  const { addStock } = useWatchList()

  const renderDropDown = () => {
    const dropDownClass = search ? "show" : null;
    
    return (
      <ul 
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer"
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map(result => {
          return (
            <li 
              key={result.symbol} 
              className='dropdown-item'
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
            >
              {result.description} ({result.symbol})
            </li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await finnHub.get('/search', {
          params: {
            q: search
          }
        });
        // console.log(responses)
        if (isMounted) setResults(responses.data.result)
      } catch(err) {
        console.log(err);
      }
    };
    if (search.length > 0) {
      fetchData()
    } else {
      setResults([])
    };
    return () => (isMounted = false)
  }, [search]);
  
  return <div className="w-50 p-5 rounded mx-auto">
    <div className="form-floating dropdown">
      <input 
        style={{backgroundColor: "rgba(145, 158, 171, 0.04)"}}
        id="search"
        type="text"
        className="form-control"
        placeholder="Search"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label htmlFor="search">Search</label>
      {renderDropDown()}
    </div>
  </div>
}