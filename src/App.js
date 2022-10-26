import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import CategoriesList from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get("http://localhost:3004/categories")
      .then((ress) => {
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: ress.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_CATEGORIES_FAIL", payload: "Bir hata olustu" });
      });
    dispatch({ type: "FETCH_BOOKS_START" });
    axios
      .get("http://localhost:3004/books")
      .then((ress) => {
        dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: ress.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_BOOKS_FAIL", payload: "Bir hata olustu" });
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
