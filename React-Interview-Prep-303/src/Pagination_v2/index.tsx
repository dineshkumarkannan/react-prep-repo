import React, { useEffect, useState } from "react";
import "./index.css";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 10;

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://dummyjson.com/users?limit=${itemPerPage}&skip=${
            (currentPage - 1) * itemPerPage
          }`
        );
        const data = await res.json();
        setTotal(data.total || 0);
        setUsers(data.users || []);
      } catch (err: any) {
        console.error(err?.message ?? err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [currentPage]);

  function handlePagination(event: { currentPage: number }) {
    setCurrentPage(event.currentPage);
  }

  return (
    <div>
      <div className="card-container">
        {loading ? (
          <div className="shimmer">
            {Array.from({ length: itemPerPage }).map((_, idx) => (
              <div className="card" key={idx}></div>
            ))}
          </div>
        ) : users.length > 0 ? (
          users.map((user: any) => (
            <div key={user.id} className="card">
              <h4 className="heading">
                {user?.firstName} {user?.lastName}
              </h4>
              <p>
                {user?.email ?? "--"}
                <br />
                {user?.phone ?? "--"}
              </p>
            </div>
          ))
        ) : (
          <div>No users found.</div>
        )}
      </div>
      <Pagination
        total={total}
        itemPerPage={itemPerPage}
        detail={handlePagination}
      />
    </div>
  );
};

type PaginationProps = {
  total: number;
  itemPerPage?: number;
  detail: (e: { currentPage: number }) => void;
  maxVisiblePages?: number;
};

const Pagination = ({
  total,
  itemPerPage = 10,
  detail,
  maxVisiblePages = 5,
}: PaginationProps) => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const count = Math.ceil(total / itemPerPage);
    setPageCount(count);
    if (currentPage > count) {
      setCurrentPage(count || 1);
      detail({ currentPage: count || 1 });
    } else {
      detail({ currentPage });
    }
    // eslint-disable-next-line
  }, [total, itemPerPage]);

  const handlePageChange = (goTo: number) => {
    if (currentPage === goTo || goTo < 1 || goTo > pageCount) return;
    setCurrentPage(goTo);
    detail({ currentPage: goTo });
  };

  const Page = (selcPage: number | string, elKey?: React.Key) => (
    <span
      key={elKey ?? selcPage}
      className={`pagination__page${currentPage === selcPage ? " active" : ""}`}
      onClick={() =>
        typeof selcPage === "number" ? handlePageChange(selcPage) : undefined
      }
      tabIndex={typeof selcPage === "number" ? 0 : -1}
      aria-current={currentPage === selcPage ? "page" : undefined}
      role={typeof selcPage === "number" ? "button" : undefined}
      onKeyPress={(e) => {
        if (
          typeof selcPage === "number" &&
          (e.key === "Enter" || e.key === " ")
        ) {
          handlePageChange(selcPage);
        }
      }}
    >
      {selcPage}
    </span>
  );

  const renderPages = () => {
    if (pageCount <= maxVisiblePages) {
      return Array.from({ length: pageCount }).map((_, i) => Page(i + 1));
    } else {
      const pageNumbers = [];
      const half = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - half);
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > pageCount) {
        endPage = pageCount;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(Page(1));
        if (startPage > 2) pageNumbers.push(Page("...", "ellipsis-start"));
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(Page(i));
      }

      if (endPage < pageCount) {
        if (endPage < pageCount - 1)
          pageNumbers.push(Page("...", "ellipsis-end"));
        pageNumbers.push(Page(pageCount));
      }

      return pageNumbers;
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        ⏪
      </button>
      {renderPages()}
      <button
        className="pagination__button"
        disabled={currentPage === pageCount}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        ⏩
      </button>
    </div>
  );
};

export default Index;
