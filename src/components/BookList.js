import React from 'react';
import '../index.css';

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <div className="list-group book-list">
      {books.map((book) => (
        <div key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>ID {book.id}:</strong> {book.title} by {book.author} ({book.year}, {book.publisher}, 회차: {book.episode})
          </div>
          <div>
            <button className="btn btn-secondary btn-sm" onClick={() => onEdit(book)}>수정</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(book.id)}>삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
