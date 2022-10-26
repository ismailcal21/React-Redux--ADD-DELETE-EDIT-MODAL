import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";

const EditCategory = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch((state) => state);
  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [newCategoryName, setNewCategoryname] = useState("");
  const params = useParams();
  console.log("params", params);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/categories`)
      .then((res) => {
        console.log(res.data);
        setAllCategories(res.data);
        const myCategory = res.data.find(
          (item) => item.id == params.categoryId
        );
        setCategory(myCategory);
        setNewCategoryname(myCategory.name);
      })
      .catch((err) => console.log("editCatErr", err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (allCategories === null) {
      alert("Kategori ismi bos birakilamaz");
      return;
    }
    const hasCategory = allCategories.find(
      (item) => item.name.toLowerCase() === newCategoryName.toLowerCase()
    );
    console.log(hasCategory);
    if (hasCategory !== undefined) {
      alert("Bu category ismi zaten mevcut");
      return;
    }
    const newCategory = {
      ...category,
      name: newCategoryName,
    };
    axios
      .put(`http://localhost:3004/categories/${category.id}`, newCategory)
      .then((res) => {
        console.log(res);
        dispatch({ type: "EDIT_CATEGORY", payload: newCategory });
        navigate("/categories");
      })
      .catch((err) => console.log(err));
  };

  if (allCategories === null) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Kategori Ismi
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={newCategoryName}
              onChange={(event) => setNewCategoryname(event.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center my-4">
            <button type="submit" className="btn btn-primary w-50">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditCategory;
