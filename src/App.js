import { Fragment, useEffect, useRef, useState } from "react";
import { findGithubAccounts } from "./api/github";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Suggestions from "./components/Suggestions/Suggestions";
import UserCard from "./components/UserCard/UserCard";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const [suggestLoading, setSuggestLoading] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }
    setShowSuggestions(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      setSuggestLoading(true);
      try {
        const users = await findGithubAccounts(inputValue);
        const filtered = users.filter(user => {
          const loginMatch = user.login.toLowerCase().includes(inputValue.toLowerCase());
          const nameMatch = user.name && user.name.toLowerCase().includes(inputValue.toLowerCase());
          return loginMatch || nameMatch;
        });
        setSuggestions(filtered.slice(0, 5));
      } catch {
        setSuggestions([]);
      }
      setSuggestLoading(false);
    }, 400);
    return () => clearTimeout(debounceTimeout.current);
  }, [inputValue]);

  function handleSuggestionClick(username) {
    setInputValue(username);
    setShowSuggestions(false);
    setSuggestions([]);
    inputRef.current.blur();
  }

  function handleInputBlur() {
    setTimeout(() => setShowSuggestions(false), 120);
  }

  function handleOnChange(event) {
    setInputValue(event.target.value);
  }

  async function onSearchSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const results = await findGithubAccounts(inputValue);
      setResults(results);
      if (results.length === 0) setError("No users found.");
    } catch (e) {
      setError("Failed to fetch users.");
    }
    setLoading(false);
  }

  function highlightMatch(text) {
    const idx = text.toLowerCase().indexOf(inputValue.toLowerCase());
    if (idx === -1) return text;
    return <span>{text.slice(0, idx)}<span className="highlight">{text.slice(idx, idx + inputValue.length)}</span>{text.slice(idx + inputValue.length)}</span>;
  }

  return (
    <main className="main">
      <h2>GitHub Account Finder</h2>
      <div className="search-container">
        <SearchBar
          value={inputValue}
          onChange={handleOnChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleInputBlur}
          inputRef={inputRef}
          onSubmit={onSearchSubmit}
        />
        {showSuggestions && (
          <Suggestions
            suggestions={suggestions}
            loading={suggestLoading}
            inputValue={inputValue}
            onSuggestionClick={handleSuggestionClick}
            highlightMatch={highlightMatch}
          />
        )}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <h3>Results</h3>
      <div id="results" className="card-grid">
        <Fragment>
          {results.map((user) => (
            <UserCard
              key={user.id}
              profileLink={user.avatar_url}
              accountLink={user.html_url}
              username={user.login}
              userType={user.type}
            />
          ))}
        </Fragment>
      </div>
    </main>
  );
}
