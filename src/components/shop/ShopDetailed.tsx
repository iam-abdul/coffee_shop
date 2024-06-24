import React from "react";
import classes from "./shopDetailed.module.css";
import { FaStar } from "react-icons/fa6";
import { AiOutlineCoffee } from "react-icons/ai";
import { RiDrinks2Line } from "react-icons/ri";
import { LuCroissant } from "react-icons/lu";
import { useRef, useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import { useParams } from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";
import axios from "axios";
import notFound from "./../../assets/images/not_found.svg";
import { IoLocationSharp } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

interface IShopDetails {
  name: string;
  description: string;
  total_ratings: string;
  distance: number;
  image: string;
  rating: number;
  city: string;
}

interface IItems {
  name: string;
  image: string;
  price: number;
  description: string;
}

const loadShopDetails = async (
  shopId: string,
  setLoadingShop: (b: boolean) => void,
  setShopDetails: (d: IShopDetails) => void
) => {
  try {
    setLoadingShop(true);
    const response = await axios.get(
      "http://localhost:3090/api/v1/shops/shop?id=" + shopId
    );

    setShopDetails(response.data.shop);
    setLoadingShop(false);
  } catch (err) {
    console.log("Err loading shop details ", err);
  }
};

const loadShopItems = async (
  shopId: string,
  setLoadingItems: (b: boolean) => void,
  setItems: (i: IItems[]) => void,
  type: "COFFEE" | "FOOD" | "DRINKS"
) => {
  try {
    setLoadingItems(true);
    const response = await axios.get(
      "http://localhost:3090/api/v1/shops/items?type=" +
        type +
        "&shop=" +
        shopId
    );

    setItems(response.data.items);
    setLoadingItems(false);
  } catch (err) {
    console.log("Err in loading shop items", err);
  }
};

const backgroundImage =
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ShopDetailed: React.FunctionComponent = () => {
  const parentScroll = useRef<HTMLDivElement>(null);
  const [loadingShop, setLoadingShop] = useState<boolean>(true);
  const [loadingItems, setLoadingItems] = useState<boolean>(true);
  const [shopDetails, setShopDetails] = useState<IShopDetails>();
  const [items, setItems] = useState<IItems[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState<"COFFEE" | "DRINKS" | "FOOD">("COFFEE");

  useEffect(() => {
    const active = searchParams.get("list");

    if (active) {
      if (active === "COFFEE") {
        setActive("COFFEE");
      } else if (active === "DRINKS") {
        setActive("DRINKS");
      } else if (active === "FOOD") {
        setActive("FOOD");
      }
    }
  }, [searchParams]);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    loadShopDetails(id, setLoadingShop, setShopDetails);
    // loadShopItems(id, setLoadingItems, setItems, active);
  }, []);

  useEffect(() => {
    loadShopItems(id, setLoadingItems, setItems, active);
  }, [active]);

  // const ShopDetailed = {
  //   name: "The code coffee",
  //   description:
  //     "The premium co-working café. Is your kitchen in need of a deep clean? Let us eliminate the hassle with our professional kitchen cleaning service at NoBroker's Our dedicated team of cleaners ensures your kitchen sparkles from top to bottom",
  //   total_ratings: 2098,
  //   distance: 3.7,
  //   image:
  //     "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   id: "1",
  //   rating: 4.8,

  //   items: [
  //     {
  //       name: "one",
  //       image:
  //         "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       description:
  //         "Is your kitchen in need of a deep clean? Let us eliminate the hassle with our professional kitchen cleaning service at NoBroker's Our dedicated team of cleaners ensures your kitchen sparkles from top to bottom, leaving it fresh, sanitized, and ready to cook healthy and hygienic meals.",
  //       price: 10,
  //     },
  //     {
  //       name: "one",
  //       image:
  //         "https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       description:
  //         "Is your kitchen in need of a deep clean? NoBroker's Our dedicated team of cleaners ensures your kitchen sparkles from top to bottom, leaving it fresh, sanitized, and ready to cook healthy and hygienic meals.",
  //       price: 11,
  //     },
  //     {
  //       name: "one",
  //       image:
  //         "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       description:
  //         "Let us eliminate the hassle with our professional kitchen cleaning service at NoBroker's Our dedicated team of cleaners ensures your kitchen sparkles from top to bottom, leaving it fresh, sanitized, and ready to cook healthy and hygienic meals.",
  //       price: 3.99,
  //     },
  //     {
  //       name: "one",
  //       image:
  //         "https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       description:
  //         "Is your kitchen in need of a deep clean? Let us eliminate the hassle with our professional kitchen cleaning service at NoBroker's Our dedicated team of cleaners ensures your kitchen sparkles from top to bottom, leaving it fresh, sanitized, and ready to cook healthy and hygienic meals.",
  //       price: 9.99,
  //     },
  //     {
  //       name: "one",
  //       image:
  //         "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       description:
  //         "Is your kitchen in need of a deep clean? Let us eliminate the hassle with our professional kitchen cleaning service at NoBroker's Our dedicated team of cleaners ensures your kitchen sparkles from top to bottom, leaving it fresh, sanitized, and ready to cook healthy and hygienic meals.",
  //       price: 0.99,
  //     },
  //     {
  //       name: "one",
  //       image:
  //         "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       description: "",
  //       price: 2.9,
  //     },
  //   ],
  // };

  const handleChildScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (parentScroll.current) {
      if (e.deltaY > 0) {
        parentScroll.current.scrollTop += e.deltaY;

        // const coffee = document.getElementById("coffee");
        // coffee?.classList.add("logoShrink");
      }
    }
  };

  if (loadingShop || !shopDetails) {
    return (
      <div className={classes.loading}>
        <RotateSpinner color={"#DDB063"} />
      </div>
    );
  }

  const clickedOnCoffee = () => {
    setSearchParams("list=COFFEE");
  };

  const clickedOnDrinks = () => {
    setSearchParams("list=DRINKS");
  };

  const clickedOnFood = () => {
    setSearchParams("list=FOOD");
  };

  // if (loadingItems || !items) {
  //   return (
  //     <div className={classes.loading}>
  //       <RotateSpinner color={"#DDB063"} />
  //     </div>
  //   );
  // }

  return (
    <div ref={parentScroll} className={classes.parent}>
      <div className={classes.topSection}>
        <img src={backgroundImage} alt="" />
      </div>
      <div className={classes.content}>
        <div className={classes.shopDetails}>
          <h4>{shopDetails.name}</h4>
          <p>{shopDetails.description}</p>
          <div className={classes.ratings}>
            <span className={classes.stars}>
              <FaStar color="#DDB063" />
              {shopDetails.rating}
            </span>

            <span>{shopDetails.total_ratings} ratings</span>
            <div className={classes.location}>
              <IoLocationSharp /> <p>{shopDetails.city}</p>
            </div>
          </div>
        </div>
        <div className={classes.menuList}>
          <span
            onClick={clickedOnCoffee}
            className={`${active === "COFFEE" ? classes.active : ""}`}
          >
            <AiOutlineCoffee size={25} />
            <p>Coffee</p>
          </span>
          <span
            onClick={clickedOnDrinks}
            className={`${active === "DRINKS" ? classes.active : ""}`}
          >
            <RiDrinks2Line size={25} />
            <p>Drinks</p>
          </span>
          <span
            onClick={clickedOnFood}
            className={`${active === "FOOD" ? classes.active : ""}`}
          >
            <LuCroissant size={25} />
            <p>Foods</p>
          </span>
        </div>
        <div onWheel={handleChildScroll} className={classes.itemsSold}>
          {loadingItems ? (
            <div className={classes.itemsLoader}>
              <RotateSpinner color={"#DDB063"} />
            </div>
          ) : (
            items.map((el, i) => {
              return (
                <MenuItem
                  key={i}
                  name={el.name}
                  price={el.price}
                  description={el.description}
                  image={el.image}
                />
              );
            })
          )}
          {items.length === 0 && !loadingItems ? (
            <div className={classes.notFound}>
              <img src={notFound} alt="" />
              <h5>No Items</h5>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetailed;
