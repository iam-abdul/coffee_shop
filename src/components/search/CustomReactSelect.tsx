import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";
// import { useState, KeyboardEventHandler } from "react";
// import { OnChangeValue } from "react-select";
const components = {
  DropdownIndicator: null,
};

// interface Option {
//   readonly label: string;
//   readonly value: string;
// }

interface ICustomReactSelectProps {
  search: (q: string) => void;
}

const CustomReactSelect: React.FunctionComponent<ICustomReactSelectProps> = ({
  search,
}) => {
  // const [inputValue, setInputValue] = useState<string>("");
  // const [value, setValue] = useState<readonly Option[]>([]);
  // const [value, setValue] = useState<Option | null>();

  // const createOption = (label: string) => ({
  //   label,
  //   value: label,
  // });

  // const handleKeyDown: KeyboardEventHandler = (event) => {
  //   if (event.key === "Enter") {
  //     search(inputValue);
  //   }
  // };

  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f0f0f0",
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#d0e0f0" : "#f0f0f0",
      color: state.isSelected ? "#000" : "#000",
    }),
  };

  const handleChange = (event: {
    label: string;
    value: string;
    __isNew__: boolean;
  }) => {
    console.log("the change event ", event);
    search(event.value);
  };

  return (
    <CreatableSelect
      // @ts-expect-error can't
      onChange={handleChange}
      placeholder="search"
      styles={customStyles}
      components={components}
      isClearable={true}
      formatCreateLabel={(value) => `Search ${value}`}
      options={[]}

      // value={value}
    />
  );
};

export default CustomReactSelect;
