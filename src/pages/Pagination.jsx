import { Link } from 'gatsby';
import React from 'react';

function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return (
    <div>
      <Link to={`${base}/${prevPage}`}>⬅️Prev</Link>
    </div>
  );
}

export default Pagination;
