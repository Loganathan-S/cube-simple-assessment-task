import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [rating, setRating] = useState("");
  const [bookId, setBookId] = useState("");

  const [showDiv, setShowDiv] = useState(false);

  const [bookdetails, setBookdetails] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = () => {
    fetch("http://localhost:3001/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  };

  const handleDelete = (event, id) => {
    // const newList = books.filter(book => book.id !== id);
    // setBooks(newList);

    axios
      .delete(`http://localhost:3001/books/${id}`)
      .then((response) => {
        // Handle success
        console.log("Record deleted:", response.data);
        dataFetch();
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting record:", error);
      });
  };

  let filteredData = [];

  function handleInputChange(event) {
    setInputValue(event.target.value);
    filteredData = books.filter((obj) => obj.author.includes(inputValue));
    setBooks(filteredData);
    if (event.target.value === "") {
      dataFetch();
    }
  }

  const handleEdit = (e, bookId) => {

    setBookId(bookId);
    console.log(bookId);
    axios
      .get(`http://localhost:3001/books/${bookId}`)
      .then((response) => {
        console.log(response.data);

        //  setBook(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setCoverImage(response.data.coverImage);
        setRating(response.data.rating);

        setShowDiv(!showDiv);
        setBookdetails(!bookdetails);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  };

  function handleSubmitChange(event, bookId) {

    event.preventDefault();

    axios
      .put(`http://localhost:3001/books/${bookId}`, {
        title,
        author,
        description,
        coverImage,
        rating
      })
      .then((response) => {
        // Handle success
        console.log("Book updated:", response.data);
        setShowDiv(false);
        setBookdetails(true);
        // onSave(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating book:", error);
      });
  }
  const gotoBookList = () => {
    setShowDiv(!showDiv);
    setBookdetails(!bookdetails)
    navigate("/booklist");
  };

  return (
    <div className="container">
      {bookdetails ? (
        <>
          <h2>Book List</h2>
          <div className="row justify-content-center">
            <div className="col-3">
              <input
                className="form-control"
                type="text"
                placeholder="search book"
                value={inputValue}
                onChange={handleInputChange}
              />{" "}
            </div>
          </div>
          <div className="row w-100 text-center">
            {books.map((book) => (
              <div className="col-md-4">
                <div className="card mt-2">
                  <div key={book.id} className="card-body">
                    <h5>{book.title}</h5>
                    <h6>Author: {book.author}</h6>
                    <p>Description: {book.description}</p>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      width={200}
                      height={200}
                    />
                    <p>{book.rating}</p>
                    &nbsp;&nbsp;
                    <div className="mt-2">
                      <button
                        className="btn btn-danger btn-sm"
                        key={book.id}
                        onClick={(e) => handleDelete(e, book.id)}
                      >
                        delete
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-2"
                        key={book.id}
                        onClick={(e) => handleEdit(e, book.id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-3">
          <div className="row justify-content-center">
            <div>
              <h5>Edit book</h5>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  {showDiv && (
                    <form >
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
                       <TextField
                        required
                        fullWidth
                        label="Rating"
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                      />
                      <div className="pt-3">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={(e) => handleSubmitChange(e,bookId)}
                        >
                          Save Book
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                          onClick={gotoBookList}
                          type="button"
                          variant="contained"
                          color="secondary"
                        >
                          Book List
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
