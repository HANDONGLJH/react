import React, { useEffect, useState } from 'react';
import { getBook, updateBook } from '../api';
import { useParams } from 'react-router-dom';

const UpdatePage = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({ title: '', author: '', year: '', publisher: '', episode: '' });
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    getBook(id)
      .then((response) => {
        setBookData(response.data);
      })
      .catch((error) => console.error('Error fetching book details:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
    setUpdateCount((count) => count + 1);

    // API 호출하여 즉각 반영
    updateBook(id, { ...bookData, [name]: value })
      .catch((error) => console.error('Error updating book:', error));
  };

  return (
    <div>
      <h1>책 수정 (총 수정 횟수: {updateCount})</h1>
      <input type="text" name="title" value={bookData.title} onChange={handleChange} placeholder="제목" />
      <input type="text" name="author" value={bookData.author} onChange={handleChange} placeholder="저자" />
      <input type="text" name="year" value={bookData.year} onChange={handleChange} placeholder="년도" />
      <input type="text" name="publisher" value={bookData.publisher} onChange={handleChange} placeholder="출판사" />
      <input type="text" name="episode" value={bookData.episode} onChange={handleChange} placeholder="에피소드" />
    </div>
  );
};

export default UpdatePage;
