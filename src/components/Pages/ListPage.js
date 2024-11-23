import React, { useEffect, useState } from 'react';
import { getBooks } from '../api';
import BookList from '../components/BookList';

const ListPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h1>책 목록</h1>
      <BookList books={books} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
};

export default ListPage;