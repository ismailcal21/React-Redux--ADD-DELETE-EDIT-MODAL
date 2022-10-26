import React, { useEffect } from "react";

import AddBookForm from "../components/AddBookForm";
import Header from "../components/Header";

const AddBook = () => {
  useEffect(() => {
    document.title = "Kitap Ekle";
  }, []);
  return (
    <div>
      <Header />
      <AddBookForm />
    </div>
  );
};

export default AddBook;
