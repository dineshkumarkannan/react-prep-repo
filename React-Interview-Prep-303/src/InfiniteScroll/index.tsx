import React, { useEffect, useRef, useState, useCallback } from "react";
import "./index.css";

const InfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });
  const [page, setPage] = useState(1);
  const productPerPage = 10;
  const isFetching = useRef(false);

  // Fetch products and append to existing list
  const fetchProduct = useCallback(async (nextPage: number) => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      setLoading(true);
      const skip = (nextPage - 1) * productPerPage;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productPerPage}&skip=${skip}`
      );
      const datas = await response.json();
      setData((prev) => ({
        ...datas,
        products:
          nextPage === 1
            ? datas.products
            : [...prev.products, ...datas.products],
      }));
      setPage(nextPage);
    } catch (err) {
      // Optionally handle error
      console.error(err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProduct(1);
    // eslint-disable-next-line
  }, []);

  const { products: allProducts, total } = data;

  // Throttle function
  const handleThrottle = (cb: () => void, delay: number) => {
    let last = useRef(0);
    return (...args: any[]) => {
      const now = Date.now();
      if (now - last.current < delay) return;
      last.current = now;
      cb(...args);
    };
  };

  // Scroll event handler
  const handleScrollEvent = useCallback(
    handleThrottle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
          document.documentElement.offsetHeight &&
        !loading &&
        allProducts.length < total
      ) {
        fetchProduct(page + 1);
      }
    }, 400),
    [loading, allProducts.length, total, page, fetchProduct]
  );

  // Attach scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [handleScrollEvent]);

  return (
    <div>
      <div className="product-container">
        {allProducts?.length > 0 &&
          allProducts.map((product: any) => (
            <div key={product?.id} className="product__single">
              <img src={product?.thumbnail} alt={product?.title} />
              <p>{product?.title}</p>
            </div>
          ))}
        {loading && <div className="loading-indicator">Loading...</div>}
        {!loading && allProducts.length >= total && (
          <div className="end-indicator">No more products to load.</div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
