import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";

const AddBookForm = (props) => {
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  console.log("ca", categoriesState);
  const navigate = useNavigate();
  // const [categories, setCategories] = useState(null);
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [bookName, setBookName] = useState("");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [guncelle, setGuncelle] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3004/categories")
  //     .then((ress) => {
  //       console.log(ress);
  //       setCategories(ress.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const Addbook = () => {
    if (bookName === "" || author === "" || category === "" || isbn === "") {
      alert("Bos birakilamaz");
      return;
    }
    const newBook = {
      id: new Date().getTime(),
      name: bookName,
      author: author,
      isbn: isbn,
      categoryId: category,
    };
    axios
      .post("http://localhost:3004/books", newBook)
      .then((ress) => {
        console.log(ress);
        dispatch({ type: "ADD_BOOK", payload: newBook });
        setBookName("");
        setAuthor("");
        setCategory("");
        setIsbn("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (categoriesState.success !== true) {
    return <Loading />;
  }

  return (
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
            <option value={""}>Open this select menu</option>
            {categoriesState.categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div
        className=" d-flex justify-content-center
      my-3"
      >
        <button
          onClick={() => setShowModal(true)}
          type="submit"
          className="btn btn-primary w-50 "
        >
          Kaydet
        </button>
      </div>
      {showModal === true && (
        <Modal
          onCancel={() => setShowModal(false)}
          onConfirm={() => Addbook()}
          title={"Kitap Ekleme Islemi"}
          aciklama={"Yeni kitap eklemek istediginizden emin misiniz?"}
        />
      )}
    </form>
  );
};

export default AddBookForm;
