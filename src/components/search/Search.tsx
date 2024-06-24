import classes from "./search.module.css";
// import CustomReactSelect from "./CustomReactSelect";
import InputSearch from "./InputSearch";
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IShopData } from "../shop/ShopCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Filters from "./Filters";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface ISearchProps {
  setShopData: (i: IShopData[]) => void;
  setLoading: (b: boolean) => void;
}

const loadSearch = async (
  setShopData: (s: IShopData[]) => void,
  setLoading: (b: boolean) => void,
  setFilters: (f: string) => void,
  setShowFilters: (b: boolean) => void,
  query: string,
  filters: string
) => {
  try {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:3090/api/v1/shops/search?q=" +
        query +
        "&filters=" +
        filters
    );
    setShopData(response.data.shops);
    setLoading(false);
    // setFilters("");
    // setShowFilters(false);
  } catch (err) {
    console.log("err searching ", err);
  }
};

const Search: React.FunctionComponent<ISearchProps> = ({
  setLoading,
  setShopData,
}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const items = searchParams.get("items");
  const query = searchParams.get("q");

  useEffect(() => {
    if (query && (sort || order || items)) {
      setShowFilters(true);
      let finalString = `&sort=${sort}&order=${order}&items=`;
      if (items) {
        if (items.includes("FOOD")) {
          finalString = `${finalString}FOOD,`;
        }
        if (items.includes("COFFEE")) {
          finalString = `${finalString}COFFEE,`;
        }
        if (items.includes("DRINKS")) {
          finalString = `${finalString}DRINKS,`;
        }
      }
      setFilters(finalString);
      loadSearch(
        setShopData,
        setLoading,
        setFilters,
        setShowFilters,
        query,
        finalString
      );
    }
  }, [sort, order, items, query]);

  // useEffect(() => {
  //   if (query && filters) {
  //     loadSearch(
  //       setShopData,
  //       setLoading,
  //       setFilters,
  //       setShowFilters,
  //       query,
  //       filters
  //     );
  //   }
  // }, []);

  const search = async (query: string) => {
    try {
      // setLoading(true);
      // const response = await axios.get(
      //   "http://localhost:3090/api/v1/shops/search?q=" +
      //     query +
      //     "&filters=" +
      //     filters
      // );
      // setShopData(response.data.shops);
      // setLoading(false);
      // setFilters("");
      // setShowFilters(false);
      // <--------------------->

      navigate(`/?q=${query}${filters}`);
    } catch (err) {
      console.log("Err searching ", err);
    }
  };

  console.log("the filter value is ", filters);

  return (
    <div className={classes.parent}>
      <div>
        <div className={classes.searchBar}>
          <InputSearch defaultValue={query} search={search} />
          <span
            onClick={() => {
              setShowFilters((p) => !p);
            }}
            className={classes.filterIcon}
          >
            {showFilters ? <IoMdClose size={20} /> : <IoFilter size={20} />}
          </span>
        </div>
        {showFilters ? (
          <div
            className={`${classes.filtersWrapper} ${
              showFilters ? classes.show : ""
            }`}
          >
            <Filters setFilters={setFilters} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
