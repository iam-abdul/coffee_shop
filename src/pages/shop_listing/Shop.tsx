import Navbar from "../../components/nav/Navbar";
import React from "react";
import classes from "./shop.module.css";
import Search from "../../components/search/Search";
const Shops: React.FunctionComponent = () => {
  return (
    <div className={classes.parent}>
      <div className={classes.content}>
        <Navbar />
        <Search />
        <h3>Featured Coffee Shops</h3>
      </div>
      <div></div>
    </div>
  );
};

export default Shops;
