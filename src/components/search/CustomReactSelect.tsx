import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";
const components = {
  DropdownIndicator: null,
};

const CustomReactSelect = () => {
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
  return (
    <CreatableSelect
      placeholder="search"
      styles={customStyles}
      components={components}
      isClearable={true}
      formatCreateLabel={(value) => `Search ${value}`}
      options={[]}
    />
  );
};

export default CustomReactSelect;
