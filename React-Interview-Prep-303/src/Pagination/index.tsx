import React, { useEffect, useState } from "react";
import "./index.css";

// Pagination component
const Pagination = ({
  data,
  dataPerPage = 10,
  initialPage = 1,
}: {
  data: any[];
  dataPerPage?: number;
  initialPage?: number;
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(data.length / dataPerPage);

  // Clamp currentPage if data changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [data.length, totalPages, currentPage]);

  const currentFirstIndex = (currentPage - 1) * dataPerPage;
  const currentLastIndex = currentFirstIndex + dataPerPage;
  const currentData = data.slice(currentFirstIndex, currentLastIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers (can be optimized for large sets)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>UserId</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((val) => (
            <tr key={val.id}>
              <td>{val.id}</td>
              <td>{val.userId}</td>
              <td>{val.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="pagination-container" aria-label="Pagination Navigation">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn-prev"
          aria-label="Previous Page"
        >
          {"<<"}
        </button>
        <ul className="pagination-numbers">
          {pages.map((v) => (
            <li
              key={v}
              className={currentPage === v ? "active" : ""}
              onClick={() => handlePageChange(v)}
              aria-current={currentPage === v ? "page" : undefined}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePageChange(v);
              }}
              role="button"
            >
              {v}
            </li>
          ))}
        </ul>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="btn-next"
          aria-label="Next Page"
        >
          {">>"}
        </button>
      </nav>
    </>
  );
};

// Main index component
const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Paginated Posts</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Pagination data={data} dataPerPage={10} />
      )}
    </div>
  );
};

export default Index;
