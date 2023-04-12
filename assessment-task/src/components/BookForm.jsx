import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    const response = await fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        author,
        description,
        coverImage,
        read: false,
        rating: null,
      }),
    });
    const data = await response.json();
    console.log(data);
    setTitle('');
    setAuthor('');
    setDescription('');
    setCoverImage('');

  };

  const gotoBookList = () => {
    navigate("/booklist");
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        fullWidth
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        required
        fullWidth
        label="Author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <TextField
        required
        fullWidth
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <TextField
        required
        fullWidth
        label="Cover Image URL"
        value={coverImage}
        onChange={(event) => setCoverImage(event.target.value)}
      />
      <div className='pt-3'>
        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
        &nbsp; &nbsp;
        <Button onClick={gotoBookList} type="button" variant="contained" color="secondary">
          Book List
        </Button>
      </div>
    </form>
  );
};

export default BookForm;