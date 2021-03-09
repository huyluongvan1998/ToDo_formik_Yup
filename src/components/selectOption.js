import React from "react";

const selectOption = ({ options, value, handleChange, id }) => {
  return (
    <div>
      <select value={value} onChange={handleChange} id={id}>
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
