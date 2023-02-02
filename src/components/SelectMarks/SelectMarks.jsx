import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { SelectBox } from "./SelectMarks.styled";

const perPage = [
  { value: 6, label: "6" },
  { value: 12, label: "12" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 150, label: "150" },
  { value: 200, label: "200" },
];

export default function SelectMarks({ selectedOption, onChange }) {
  return (
    <SelectBox>
      per page
      <Select
        options={perPage}
        defaultValue={perPage[1]}
        value={selectedOption} 
        onChange={onChange} 
        isClearable
        isLoading
        theme={(theme, provided, state) => ({
          ...theme,
          borderRadius: 5,
          backgroundColor: "#3f51b5",
          colors: {
            ...theme.colors,
            primary25: "pink",
            primary75: "black",
          },
        })}
      />
    </SelectBox>
  );
}
SelectMarks.propTypes = {
  selectedOption: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
