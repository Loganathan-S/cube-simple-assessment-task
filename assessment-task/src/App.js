import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import DeleteBook from './components/DeleteBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BookForm/>} />
          <Route path='booklist' element={<BookList/>} />
          <Route path='deletebook' element={<DeleteBook/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
