import { useState } from "react";
import SearchProduct from "./SearchProduct";
import "../assets/SearchBox.css";

const SearchBox = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Nhập tên sản phẩm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <SearchProduct query={query} />
    </div>
  );
};

export default SearchBox;
