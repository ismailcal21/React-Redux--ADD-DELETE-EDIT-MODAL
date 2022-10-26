import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";

const EditBook = () => {
  const dispatch = useDispatch();
  const { categoriesState, bookState } = useSelector((state) => state);
  console.log("ca2", categoriesState);

  const params = useParams();
  console.log(params);

  const navigate = useNavigate();

  //const [categories, setCategories] = useState(null);
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  //const [books, setBooks] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [bookName, setBookName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const arananKitap = bookState.books.find(
      (item) => item.id == params.bookId
    );
    if (arananKitap == undefined) {
      navigate("/");
      return;
    }
    setAuthor(arananKitap.author);
    setIsbn(arananKitap.isbn);
    setBookName(arananKitap.name);
    setCategory(arananKitap.categoryId);
    // axios
    //   .get(`http://localhost:3004/books/${params.bookId}`)
    //   .then((ress) => {
    //     console.log(ress);
    //     setBooks(ress.data);
    //     setAuthor(ress.data.author);
    //     setIsbn(ress.data.isbn);
    //     setBookName(ress.data.name);
    //     setCategory(ress.data.categoryId);
    //     // axios
    //     //   .get("http://localhost:3004/categories")
    //     //   .then((ress) => {
    //     //     console.log(ress);
    //     //     setCategories(ress.data);
    //     //   })
    //     //   .catch((err) => {
    //     //     console.log(err);
    //     //   });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    document.title = `Kitaplik- Kitap Duzenle - ${arananKitap.name}`;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const editbook = () => {
    if (bookName === "" || author === "" || category === "") {
      alert("Bos birakilamaz");
      return;
    }
    const updatedBook = {
      id: params.bookId,
      name: bookName,
      author: author,
      isbn: isbn,
      categoryId: category,
    };
    console.log("updatedBook", updatedBook);
    axios
      .put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
      .then((ress) => {
        console.log(ress);
        dispatch({ type: "EDIT_BOOK", payload: updatedBook });
        setAuthor("");
        setIsbn("");
        setBookName("");
        setCategory("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (bookState.success !== true || categoriesState.success !== true) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div
          className="container d-flex justify-content-end
      my-5"
        >
          <div className="input-group mb-3 w-50  mx-5 ">
            <input
              type="text"
              className="form-control"
              placeholder="Kitap adi"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 w-50  ">
            <input
              type="text"
              className="form-control"
              placeholder="Yazari"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>
        <div
          className="container d-flex justify-content-end
      my-5"
        >
          <div className="input-group mb-3 w-50  mx-5 ">
            <input
              type="text"
              className="form-control"
              placeholder="ISBN"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 w-50  ">
            <select
              className="form-select"
              aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Open this select menu</option>
              {categoriesState.categories.map((cat) => {
                return <option value={cat.id}>{cat.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div
          className=" d-flex justify-content-center
      my-3"
        >
          <button type="submit" className="btn btn-primary w-50 ">
            Kaydet
          </button>
        </div>
      </form>
      {showModal === true && (
        <Modal
          onCancel={() => setShowModal(false)}
          onConfirm={() => editbook()}
          title={"Duzenleme Islemi"}
          aciklama={"Bu kitabi duzenlemek istediginizden emin misiniz?"}
        />
      )}
    </div>
  );
};
export default EditBook;
