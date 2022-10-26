import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Modal from "./Modal";
import axios from "axios";

const ListCategories = () => {
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [silinecekCategory, setSilinecekCategory] = useState(null);
  const [silinecekCategoryName, setSilinecekCategoryName] = useState("");

  console.log("cs2", categoriesState);

  useEffect(() => {
    document.title = "Kategoriler";
  }, []);

  const CategorySil = (id) => {
    axios
      .delete(`http://localhost:3004/categories/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "DELETE_CATEGORY", payload: id });
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.log("errCat", err);
      });
  };

  if (categoriesState.success !== true) {
    return <Loading />;
  }

  return (
    <div>
      <div className="listbookDiv" style={{ height: "100vh", width: "100%" }}>
        <div className="d-flex justify-content-end  container">
          <Link to="/add-category" className="btn btn-danger btn-sm my-3">
            Add Kategori
          </Link>
        </div>
        <div className="container font d-flex justify-content-center my-5">
          <table className="table table-striped tableGenislik">
            <thead>
              <tr className="">
                <th className="text-center" scope="col">
                  #
                </th>
                <th scope="col">Kategori Adi</th>

                <th className="text-center" scope="col">
                  Islem
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesState.categories.map((category) => {
                return (
                  <tr key={category.id}>
                    <th></th>

                    <th>{category.name}</th>

                    <td className="d-flex justify-content-end">
                      <button
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSilinecekCategory(category.id);
                          setSilinecekCategoryName(category.name);
                        }}
                        className="btn btn-danger mx-3"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/edit-category/${category.id}`}
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
          {showDeleteModal === true && (
            <Modal
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={() => CategorySil(silinecekCategory)}
              title={"Silme Islemi"}
              aciklama={`${silinecekCategoryName} 
            `}
              aciklama2={"Silmek istediginize emin misiniz?"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ListCategories;
