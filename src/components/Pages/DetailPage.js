import React, { useEffect, useState } from 'react';
import { getBook } from '../api';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook(id)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>저자: {book.author}</p>
      <p>년도: {book.year}</p>
      <p>출판사: {book.publisher}</p>
      <p>에피소드: {book.episode}</p>
    </div>
  );
};

export default DetailPage;
