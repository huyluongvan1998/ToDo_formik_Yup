import React from "react";

const selectOption = ({ options, value, handleChange }) => {
  return (
    <div>
      <select value={value} onChange={handleChange}>
        {options
          ? options.map((opt) => (
              <option value={opt.status} key={opt.id}>
                {opt.status}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default selectOption;
