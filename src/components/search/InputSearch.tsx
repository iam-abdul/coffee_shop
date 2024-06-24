import { useState } from "react";
import classes from "./inputSearch.module.css";
interface ICustomReactSelectProps {
  search: (q: string) => void;
  defaultValue: string | null;
}

const InputSearch: React.FunctionComponent<ICustomReactSelectProps> = (
  props: ICustomReactSelectProps
) => {
  const [value, setValue] = useState<string>(
    props.defaultValue ? props.defaultValue : ""
  );
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.search(value);
    }
  };

  return (
    <input
      className={classes.search}
      onKeyDown={keyDownHandler}
      type="text"
      onChange={changeHandler}
      value={value}
    />
  );
};

export default InputSearch;
