import React, { useState } from "react";
//https://react-icons.github.io/react-icons
import { BsSearch } from "react-icons/bs";
import { BsChevronCompactDown } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
const SearchBar = ({
  handleSubmit,
  handleKeyword,
  handleSelect,
  search,
  select,
  setSelect,
}) => {
  return (
    <div id="search-bar" className="d-flex justify-content-center">
      <div
        onClick={handleSubmit}
        className="icon-container d-flex justify-content-center  align-items-center p-2"
      >
        <BsSearch />
      </div>

      <form onSubmit={handleSubmit} className="d-flex w-100">
        <input
          className="w-100"
          type="text"
          placeholder="Search images and videos"
          value={search}
          onChange={handleKeyword}
        />
      </form>
      <div className="dropdown d-flex justify-content-center align-items-center">
        <a
          className=""
          href="#"
          //   role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <p className="d-flex justify-content-center align-items-center">
            {select ? select : "images"}
            <BsChevronCompactDown />
          </p>
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li onClick={(e) => setSelect("")}>
            <a className="dropdown-item">images</a>
          </li>
          <li onClick={(e) => setSelect("videos")}>
            <a className="dropdown-item">videos</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
