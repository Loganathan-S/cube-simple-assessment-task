import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const EditBook = ({ book, handleEditBook }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [coverImage, setCoverImage] = useState(book.coverImage);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditBook({ ...book, title, author, description, coverImage });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Cover Image"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default EditBook;