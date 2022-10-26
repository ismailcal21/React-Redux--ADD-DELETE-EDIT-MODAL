import React, { useEffect } from "react";
import Header from "../components/Header";
import ListBook from "../components/ListBook";

const Home = () => {
  useEffect(() => {
    document.title = "Kitaplik";
  }, []);
  return (
    <div>
      <Header />
      <ListBook />
    </div>
  );
};

export default Home;
