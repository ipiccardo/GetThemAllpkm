import React, { useEffect } from "react";

const CustomPagination = ({ setPage, page, pageCount }) => {
  const handleChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(0);
  }, [setPage]);

  return (
    <div>
      <button disabled={page === 0} onClick={() => handleChange(page - 1)}>
        Previous
      </button>
      <span>Page {page + 1}</span>
      <button
        disabled={page === pageCount - 1}
        onClick={() => handleChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
