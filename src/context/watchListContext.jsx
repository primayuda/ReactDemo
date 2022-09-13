import { createContext, useContext, useState } from 'react';

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) setWatchList([...watchList, stock]);
  };

  const deleteStock = (stock) => {
    const modifiedWatchList = watchList.filter(item => item !== stock);
    setWatchList(modifiedWatchList);
  }
  
  return (
    <WatchListContext.Provider
      value={{
        watchList,
        addStock,
        deleteStock
      }}
    >
      {children}
    </WatchListContext.Provider>
  )
};

export const useWatchList = () => useContext(WatchListContext);

// export default { WatchListContext, WatchListProvider, useWatchList };