import React, { useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import styles from "./pagination.module.css";

const CustomPagination = ({ setPage, page, pageCount }) => {
  const [inputPage, setInputPage] = useState("");
  const [isLargerThan766] = useMediaQuery("(min-width: 766px)");

  const handleChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= pageCount) {
      setPage(pageNumber - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setInputPage("");
  };

  const generatePageNumbers = () => {
    const pagesToShow = 5;
    const pages = [];
    let startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (!isLargerThan766) {
    return (
      <div className={styles.container}>
        <button
          className={styles.button}
          disabled={page === 0}
          onClick={() => handleChange(page - 1)}
        >
          Previous
        </button>
        <button
          className={styles.button}
          disabled={page === pageCount - 1}
          onClick={() => handleChange(page + 1)}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={page === 0}
        onClick={() => handleChange(page - 1)}
      >
        Previous
      </button>
      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles.pageNumber} ${
            page === pageNumber - 1 ? styles.active : ""
          }`}
          onClick={() => handleChange(pageNumber - 1)}
        >
          {pageNumber}
        </button>
      ))}
      {pageCount > 5 && page < pageCount - 2 && (
        <span className={styles.ellipsis}>...</span>
      )}
      <input
        type="text"
        value={inputPage}
        onChange={(e) => setInputPage(e.target.value)}
        className={styles.pageInput}
        placeholder={`Page (1 - ${pageCount})`}
      />
      <button className={styles.goButton} onClick={handleGoToPage}>
        Go
      </button>
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
