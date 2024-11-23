import React, { useState, useEffect } from 'react';
import { getBooks, addBook, updateBook, deleteBook } from './api';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // 검색 결과를 저장
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
  const [selectedBook, setSelectedBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    getBooks()
      .then((response) => {
        console.log("Fetched books:", response.data); // 디버깅용 로그 추가
        setBooks(response.data);
        setFilteredBooks(response.data); // 초기 검색 결과 설정
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(books); // 검색어가 없으면 전체 도서 목록 표시
    } else {
      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  const handleFormSubmit = (bookData) => {
    if (selectedBook) {
      updateBook(selectedBook.id, bookData)
        .then(() => fetchBooks())
        .catch((error) => console.error("Error updating book:", error));
    } else {
      addBook(bookData)
        .then(() => fetchBooks())
        .catch((error) => console.error("Error adding book:", error));
    }
    setShowForm(false);
    setSelectedBook(null);
  };

  const handleDelete = (id) => {
    deleteBook(id)
      .then(() => fetchBooks())
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleAddNew = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">AJAX 만화 도서 목록</h1>
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="도서 제목 검색"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={fetchBooks}>목록 보기</button>
        <button className="btn btn-success" onClick={handleAddNew}>도서 추가</button>
      </div>
      {showForm && (
        <BookForm
          selectedBook={selectedBook}
          onFormSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
