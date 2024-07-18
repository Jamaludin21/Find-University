import { useEffect, useRef, useState } from "react";
import "./App.css";
import { University } from "./components/University";
import styled from "styled-components";

function App() {
  const [country, setCountry] = useState("");
  const [searchCountry, setSearchCountry] = useState(country);
  const [dataUniversity, setDataUniversity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const countryInputRef = useRef(null);

  const handleSearch = () => {
    setSearchCountry(country);
  };

  const totalPages = Math.ceil(dataUniversity.length / itemsPerPage);
  const currentData = dataUniversity.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const propsValue = {
    dataUniversity,
    currentPage,
    currentData,
    itemsPerPage,
    totalPages,
    setDataUniversity,
  };

  const propsHandle = {
    handleItemsPerPageChange,
    handlePageChange,
  };

  const FilterComp = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 8px;
  `;

  useEffect(() => {
    if (countryInputRef.current) {
      countryInputRef.current.focus();
    }
  }, [country]);

  return (
    <div className="app-container">
      <h1 className="text-center">University Finder</h1>
      <FilterComp>
        <label>
          Search country:
          <input
            type="text"
            ref={countryInputRef}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country name"
            onKeyPress={handleKeyPress}
          />
        </label>
        <div className="pagination-controls">
          <label>
            Items per page:
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={100}>100</option>
              <option value={250}>250</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
            </select>
          </label>
        </div>
      </FilterComp>
      <University
        country={searchCountry}
        propsValue={propsValue}
        propsHandle={propsHandle}
      />
    </div>
  );
}

export default App;
