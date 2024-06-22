import React from "react";
import classes from "./shopDetailed.module.css";
import { FaStar } from "react-icons/fa6";
import { AiOutlineCoffee } from "react-icons/ai";
import { RiDrinks2Line } from "react-icons/ri";
import { LuCroissant } from "react-icons/lu";
import { useRef } from "react";

const ShopDetailed: React.FunctionComponent = () => {
  const parentScroll = useRef<HTMLDivElement>(null);

  const ShopDetailed = {
    name: "The code coffee",
    total_ratings: 2098,
    distance: 3.7,
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    id: "1",
    rating: 4.8,

    items: [
      {
        name: "one",
      },
      {
        name: "one",
      },
      {
        name: "one",
      },
      {
        name: "one",
      },
      {
        name: "one",
      },
      {
        name: "one",
      },
      {
        name: "one",
      },
      {
        name: "one",
      },
    ],
  };

  const handleChildScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (parentScroll.current) {
      if (e.deltaY > 0) {
        parentScroll.current.scrollTop += e.deltaY;
      }
    }
  };

  return (
    <div ref={parentScroll} className={classes.parent}>
      <div className={classes.topSection}>
        <img src={ShopDetailed.image} alt="" />
      </div>
      <div className={classes.content}>
        <div className={classes.shopDetails}>
          <h4>{ShopDetailed.name}</h4>
          <div className={classes.ratings}>
            <span className={classes.stars}>
              <FaStar color="#DDB063" />
              {ShopDetailed.rating}
            </span>

            <span>{ShopDetailed.total_ratings}</span>
          </div>
        </div>
        <div className={classes.menuList}>
          <span>
            <AiOutlineCoffee size={25} />
            <p>Coffee</p>
          </span>
          <span>
            <RiDrinks2Line size={25} />
            <p>Drinks</p>
          </span>
          <span>
            <LuCroissant size={25} />
            <p>Foods</p>
          </span>
        </div>
        <div onWheel={handleChildScroll} className={classes.itemsSold}>
          {ShopDetailed.items.map((el, i) => {
            return (
              <div className={classes.item} key={i}>
                {el.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopDetailed;
