import React from "react";
import classes from "./shopCard.module.css";
import { FaRegHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export interface IShopData {
  _id: string;
  name: string;
  image: string;
  total_ratings: number;
  rating: number;
  distance: number;
}

function abbreviateNumber(num: number) {
  if (num < 1e3) return num; // Less than 1000
  if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + "K"; // Thousands
  if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + "M"; // Millions
  if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + "B"; // Billions
  if (num >= 1e12) return +(num / 1e12).toFixed(1) + "T"; // Trillions
}
const ShopCard: React.FunctionComponent<IShopData> = ({
  _id,
  name,
  image,
  total_ratings,
  rating,
  distance,
}) => {
  const navigate = useNavigate();
  const openDetailedView = () => {
    console.log("clicked to nav");
    navigate("/shop/" + _id + "?list=COFFEE");
  };

  return (
    <div onClick={openDetailedView} className={classes.parent}>
      <div className={classes.imageContainer}>
        <div className={classes.frame}>
          <img src={image} alt="" />
        </div>
        <div className={classes.fav}>
          <FaRegHeart size={16} />
        </div>
      </div>
      <div className={classes.content}>
        <h4>{name}</h4>
        <div className={classes.ratings}>
          <span className={classes.star}>
            <FaStar color="#DDB063" />
            {rating}
          </span>
          <span>{abbreviateNumber(total_ratings)} ratings</span>
        </div>
        <div className={classes.distance}>
          <span>{distance} miles</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
