import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar({ value, onChange, onFocus, onBlur, inputRef, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit} role="search" aria-label="GitHub user search" autoComplete="off">
      <div style={{ position: "relative", width: "100%" }}>
        <input
          ref={inputRef}
          placeholder="Enter GitHub username or email"
          onChange={onChange}
          value={value}
          aria-label="Search GitHub users"
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
        />
      </div>
      <button type="submit" aria-label="Search" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaSearch /></button>
    </form>
  );
} 