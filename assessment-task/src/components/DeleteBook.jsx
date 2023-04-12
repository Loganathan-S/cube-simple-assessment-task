import React, { useState, useEffect } from 'react';
import BookList from './BookList';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/books/${id}`, {
      method: 'DELETE',
    })
      .then(() => setBooks(books.filter((book) => book.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>My Book Library</h1>
      <BookList books={books} onDelete={handleDelete}/>
    </div>
  );
};

export default DeleteBook;