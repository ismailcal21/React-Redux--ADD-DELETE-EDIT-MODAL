import { useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import ListCategories from "../components/ListCategories";

const CategoriesList = () => {
  const { categoriesState } = useSelector((state) => state);
  console.log("CS", categoriesState);
  return (
    <div>
      <Header />
      <ListCategories />
    </div>
  );
};
export default CategoriesList;
