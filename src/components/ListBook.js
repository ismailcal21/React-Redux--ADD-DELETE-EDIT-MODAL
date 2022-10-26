import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";

const ListBook = (props) => {
  const dispatch = useDispatch();
  // const [books, setBooks] = useState(null);
  // const [categories, setCategories] = useState(null);
  const [didUpdated, setDidUpdated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sil, setSil] = useState(null);
  const [silinecekKitapIsmi, setSilinecekKitapIsmi] = useState(null);

  const { categoriesState, bookState } = useSelector((state) => state);
  console.log(categoriesState);

  useEffect(() => {
    // axios
    //   .get("http://localhost:3004/books")
    //   .then((ress) => {
    //     console.log(ress);
    //     setBooks(ress.data);
    //     //  axios
    //     //    .get("http://localhost:3004/categories")
    //     //    .then((ress) => {
    //     //      console.log(ress);
    //     //      setCategories(ress.data);
    //     //    })
    //     //    .catch((err) => {
    //     //      console.log(err);
    //     //    });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [didUpdated]);

  const DeleteBook = (id) => {
    console.log("id", id);
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((ress) => {
        dispatch({ type: "DELETE_BOOK", payload: id });
        console.log(ress);
        setDidUpdated(!didUpdated);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (bookState.success !== true || categoriesState.success !== true) {
    return <Loading />;
  }
  return (
    <div className="listbookDiv" style={{ height: "100vh", width: "100%" }}>
      <div className="d-flex justify-content-end  container">
        <Link to="/add-book" className="btn btn-danger btn-sm my-3">
          Add Book
        </Link>
      </div>
      <div className="container font d-flex justify-content-center my-5">
        <table className="table table-striped tableGenislik">
          <thead>
            <tr className="">
              <th className="text-center" scope="col">
                #
              </th>
              <th scope="col">Kitap Adi</th>
              <th className="text-center" scope="col">
                Author
              </th>
              <th className="text-center" scope="col">
                ISBN
              </th>
              <th className="text-center" scope="col">
                categori ADI
              </th>
            </tr>
          </thead>
          <tbody>
            {bookState.books.map((book) => {
              const category = categoriesState.categories.find(
                (cat) => cat.id == book.categoryId
              );
              return (
                <tr key={book.id}>
                  <th></th>

                  <th>{book.name}</th>
                  <td className="text-center">{book.author}</td>
                  <td className="text-center">
                    {book.isbn === "" ? "-" : book.isbn}
                  </td>
                  <td className="text-center">{category.name}</td>
                  <td className="d-flex justify-content-end">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSil(book.id);
                        setSilinecekKitapIsmi(book.name);
                      }}
                      className="btn btn-danger mx-3"
                    >
                      Delete
                    </button>
                    <Link
                      to={`edit-book/${book.id}`}
                      className="btn btn-warning"
                    >
                      EditBook
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showModal === true && (
          <Modal
            onCancel={() => setShowModal(false)}
            onConfirm={() => DeleteBook(sil)}
            title={"Silme Islemi"}
            aciklama={`${silinecekKitapIsmi} 
            `}
            aciklama2={"Silmek istediginize emin misiniz?"}
          />
        )}
      </div>
    </div>
  );
};

export default ListBook;
