import React from "react";

const Filter = (props) => {
  const { searchValue, handleFilter } = props;

  
    

  return (
    <div>
      Filter shown with <input value={searchValue} onChange={handleFilter} />
    </div>
  );
};
export default Filter;