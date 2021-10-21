import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sort, setSort] = useState();
  const [filter, setFilter] = useState()

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then(resp => resp.json())
      .then(data => setStocks(data));
  }, []);

  const buyStock = (stock) => {
    if (!portfolio.includes(stock)) {
      setPortfolio(currentPortfolio => [...currentPortfolio, stock]);
    }
  };

  const sellStock = (stock) => {
    setPortfolio(currentPortfolio => currentPortfolio.filter(portfolioStock => 
      portfolioStock.id !== stock.id
    ))
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const displayStocks = stocks
    .filter(stock => stock.type === filter || !filter)
    .sort((a, b) => {
    if (a[sort] > b[sort]) return 1;
    if (a[sort] < b[sort]) return -1;
    return 0
  });

  return (
    <div>
      <SearchBar sort={sort} filter={filter} handleSort={handleSort} handleFilter={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayStocks} buyStock={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} sellStock={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
