// src/components/BookForm.js

import React, { useState, useEffect } from 'react';
import '../index.css'; // 스타일 추가

const BookForm = ({ selectedBook, onFormSubmit, onCancel }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    year: '',
    publisher: '',
    episode: '',
  });

  useEffect(() => {
    if (selectedBook) {
      setBookData(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(bookData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{selectedBook ? '책 수정' : '새 책 추가'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={bookData.title} onChange={handleChange} placeholder="제목" required />
          <input type="text" name="author" value={bookData.author} onChange={handleChange} placeholder="저자" required />
          <input type="text" name="year" value={bookData.year} onChange={handleChange} placeholder="년도" />
          <input type="text" name="publisher" value={bookData.publisher} onChange={handleChange} placeholder="출판사" />
          <input type="text" name="episode" value={bookData.episode} onChange={handleChange} placeholder="에피소드" />
          <button type="submit">저장</button>
          <button type="button" onClick={onCancel}>취소</button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;