import React, { useEffect } from "react";
import styles from "./pagination.module.css";

const CustomPagination = ({ setPage, page, pageCount }) => {
  const handleChange = (newPage) => {
    setPage(newPage);
  };

  //   useEffect(() => {
  //     setPage(0);
  //   }, [setPage]);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={page === 0}
        onClick={() => handleChange(page - 1)}
      >
        Previous
      </button>
      <span className={styles.pageNumber}>Page {page + 1}</span>
      <button
        className={styles.button}
        disabled={page === pageCount - 1}
        onClick={() => handleChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
