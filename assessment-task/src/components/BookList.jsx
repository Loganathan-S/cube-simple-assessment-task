import React, { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleDelete = (id) => {
    const newList = books.filter(book => book.id !== id);
    setBooks(newList);
  }

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Description: {book.description}</p>
            <img src={book.coverImage} alt={book.title} />
            &nbsp;&nbsp;
            <button className='btn btn-danger btn-sm' key={book.id} onClick={()=>handleDelete(book.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;