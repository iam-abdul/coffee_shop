import Navbar from "../../components/nav/Navbar";
import React, { useState, useEffect } from "react";
import classes from "./shop.module.css";
import Search from "../../components/search/Search";
import ShopCard from "../../components/shop/ShopCard";
import { IShopData } from "../../components/shop/ShopCard";
import axios from "axios";
import { RotateSpinner } from "react-spinners-kit";

const loadShopListing = async (
  page: number,
  setShopData: (d: IShopData[]) => void,
  setLoading: (b: boolean) => void
) => {
  try {
    setLoading(true);
    const stores = await axios.get(
      "http://localhost:3090/api/v1/shops/list?page" + page
    );

    setShopData(stores.data.shops);
    setLoading(false);
  } catch (err) {
    console.log("Err fetching stores", err);
  }
};

const Shops: React.FunctionComponent = () => {
  const [shopData, setShopData] = useState<IShopData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    loadShopListing(0, setShopData, setLoading);
  }, []);
  // const shopData: IShopData[] = [
  //   {
  //     id: "1",
  //     name: "Home Coffee Roasters",
  //     image:
  //       "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     rating: 4.9,
  //     total_ratings: 1290,
  //     distance: 3.9,
  //   },
  //   {
  //     id: "2",
  //     name: "filter coffee",
  //     image:
  //       "https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     rating: 5,
  //     total_ratings: 3232,
  //     distance: 2,
  //   },

  //   {
  //     id: "3",
  //     name: "filter coffee",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1664970900401-0756aa4d8459?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     rating: 5,
  //     total_ratings: 3232,
  //     distance: 2,
  //   },
  //   {
  //     id: "4",
  //     name: "filter coffee",
  //     image:
  //       "    https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     rating: 5,
  //     total_ratings: 3232,
  //     distance: 2,
  //   },

  //   {
  //     id: "5",
  //     name: "filter coffee",
  //     image:
  //       "https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     rating: 5,
  //     total_ratings: 3232,
  //     distance: 2,
  //   },

  //   {
  //     id: "6",
  //     name: "filter coffee",
  //     image:
  //       "    https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     rating: 5,
  //     total_ratings: 3232,
  //     distance: 2,
  //   },
  // ];

  return (
    <div className={classes.parent}>
      <div className={classes.content}>
        <Navbar />
        <Search />
        <h3>Featured Coffee Shops</h3>
        <div className={classes.shops}>
          {loading ? (
            <div>
              <RotateSpinner color={"#DDB063"} />
            </div>
          ) : (
            ""
          )}
          {shopData.map((el, i) => {
            return (
              <ShopCard
                _id={el._id}
                distance={el.distance}
                name={el.name}
                total_ratings={el.total_ratings}
                rating={el.rating}
                image={el.image}
                key={i}
              />
            );
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Shops;
