import React, { useEffect, useState } from "react";
import classes from "./filters.module.css";
import { useSearchParams } from "react-router-dom";
interface IFilterProps {
  setFilters: (f: string) => void;
}

const Filters: React.FunctionComponent<IFilterProps> = ({ setFilters }) => {
  const [searchParams] = useSearchParams();
  const [selectedOrder, setSelectedOrder] = useState<string>(
    searchParams.get("order") === "asc" ? "asc" : "desc"
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sort") === "name" ? "name" : "rating"
  );

  const [checkboxes, setCheckboxes] = useState<{
    food: boolean;
    coffee: boolean;
    drinks: boolean;
  }>({
    food: searchParams.get("items")?.includes("FOOD") ? true : false,
    coffee: searchParams.get("items")?.includes("COFFEE") ? true : false,
    drinks: searchParams.get("items")?.includes("DRINKS") ? true : false,
  });

  const handleChangeOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOrder(event.target.value);
    setFilters(event.target.value);
  };

  const handleCheckboxChange =
    (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxes((prevState) => ({
        ...prevState,
        [category]: event.target.checked,
      }));
      const filterValue = category + (event.target.checked ? "On" : "Off");
      setFilters(filterValue);
    };

  useEffect(() => {
    let finalString = `&sort=${sortBy}&order=${selectedOrder}&items=`;
    if (checkboxes.food) {
      finalString = `${finalString}FOOD,`;
    }
    if (checkboxes.coffee) {
      finalString = `${finalString}COFFEE,`;
    }
    if (checkboxes.drinks) {
      finalString = `${finalString}DRINKS,`;
    }
    setFilters(finalString);
  }, [sortBy, checkboxes, selectedOrder]);

  return (
    <div className={classes.parent}>
      <div className={classes.dialog}>
        <div>
          <div className={classes.filterItem}>
            <span>Sort By</span>
            <select
              name="sort_by"
              id=""
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className={classes.filterItem}>
            <span>Order</span>
            <label>
              <input
                type="radio"
                name="order"
                value="asc"
                checked={selectedOrder === "asc"}
                onChange={handleChangeOrder}
              />{" "}
              Ascending
            </label>
            <label>
              <input
                type="radio"
                name="order"
                value="desc"
                checked={selectedOrder === "desc"}
                onChange={handleChangeOrder}
              />{" "}
              Descending
            </label>
          </div>
          <div className={classes.filterItem}>
            <span>Items</span>
            <label>
              <input
                type="checkbox"
                name="food"
                checked={checkboxes.food}
                onChange={handleCheckboxChange("food")}
              />{" "}
              Food
            </label>
            <label>
              <input
                type="checkbox"
                name="coffee"
                checked={checkboxes.coffee}
                onChange={handleCheckboxChange("coffee")}
              />{" "}
              Coffee
            </label>
            <label>
              <input
                type="checkbox"
                name="drinks"
                checked={checkboxes.drinks}
                onChange={handleCheckboxChange("drinks")}
              />{" "}
              Drinks
            </label>
          </div>
        </div>
        {/* <div>
          <button>Cancel</button>
          <button>Done</button>
        </div> */}
      </div>
    </div>
  );
};

export default Filters;
