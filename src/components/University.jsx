/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { GetUniversity } from "../Api";

export function University({ country, propsValue, propsHandle }) {
  const [loading, setLoading] = useState(true);
  const { currentPage, currentData, totalPages, setDataUniversity } =
    propsValue;
  const { handlePageChange } = propsHandle;

  const dataAPI = useCallback(async () => {
    setLoading(true);
    const response = await GetUniversity(country);
    setDataUniversity(response);
    setLoading(false);
  }, [country, setDataUniversity]);

  useEffect(() => {
    dataAPI();
  }, [dataAPI]);

  return (
    <div className="university-container">
      <h2 className="text-center">
        Universities in{" "}
        <span className="text-underline">
          {country ? country : "All Country"}
        </span>
      </h2>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={index + 1 === currentPage ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : currentData.length === 0 ? (
        <div className="empty-state text-center">
          <p>No universities found for the specified country.</p>
        </div>
      ) : (
        <div className="university-list">
          {currentData.map((university, index) => (
            <div className="university-item" key={index}>
              <h3>{university.name}</h3>
              <p>{university.country}</p>
              <a
                href={university.web_pages[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {university.web_pages[0]}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
