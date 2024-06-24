import classes from "./menuItem.module.css";
import React from "react";

export interface IMenuItem {
  name: string;
  price: number;
  image: string;
  description: string;
}

const MenuItem: React.FunctionComponent<IMenuItem> = ({
  name,
  price,
  image,
  description,
}) => {
  return (
    <div className={classes.parent}>
      <div className={classes.imageContainer}>
        <img src={image} />
      </div>
      <div className={classes.content}>
        <h4>{name}</h4>
        <p className={classes.description}>{description}</p>
        <p className={classes.price}>$ {price}</p>
      </div>
    </div>
  );
};

export default MenuItem;
