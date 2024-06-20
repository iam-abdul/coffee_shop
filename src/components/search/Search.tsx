import classes from "./search.module.css";
import CustomReactSelect from "./CustomReactSelect";
import { IoFilter } from "react-icons/io5";

const Search: React.FunctionComponent = () => {
  return (
    <div className={classes.parent}>
      <div>
        <div className={classes.searchBar}>
          <CustomReactSelect />
          <span className={classes.filterIcon}>
            <IoFilter size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
