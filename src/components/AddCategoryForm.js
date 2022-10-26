import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategoryFrom = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesState } = useSelector((state) => state);

  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    Document.title = "Kitaplik- Kategori Ekle";
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoryName === "") {
      alert("Category ismi bos birakilmaz");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) =>
        item.name.toLowerCase().trim() === categoryName.toLowerCase().trim()
    );
    if (hasCategory !== undefined) {
      alert("Bu kategory zaten kayitlidir");
      return;
    }
    const newCategory = {
      id: new Date().getTime(),
      name: categoryName[0].toUpperCase() + categoryName.substring(1),
    };
    axios
      .post("http://localhost:3004/categories", newCategory)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "ADD_CATEGORY", payload: newCategory });
        setCategoryName("");
        navigate("/categories");
      })
      .catch((err) => console.log("addCat", err));
  };

  return (
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
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center my-4">
          <button type="submit" className="btn btn-primary w-50">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddCategoryFrom;
