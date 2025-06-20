import React from "react";
import "./Suggestions.css";

export default function Suggestions({ suggestions, loading, inputValue, onSuggestionClick, highlightMatch }) {
  return (
    <ul className="suggestion-list">
      {loading && (
        <li className="suggestion-item" style={{ justifyContent: 'center' }}>
          <span className="loading">Loading...</span>
        </li>
      )}
      {!loading && suggestions.length === 0 && inputValue && (
        <li className="suggestion-item" style={{ color: '#aaa', fontStyle: 'italic' }}>
          No suggestions found
        </li>
      )}
      {!loading && suggestions.map((user) => (
        <li
          key={user.id}
          className="suggestion-item"
          onMouseDown={() => onSuggestionClick(user.login)}
        >
          <img src={user.avatar_url} alt="avatar" width="24" height="24" style={{ borderRadius: "50%", marginRight: 8 }} />
          <span>{highlightMatch(user.login)}</span>
          {user.name && (
            <span style={{ color: '#888', marginLeft: 8, fontSize: '0.95em' }}>({highlightMatch(user.name)})</span>
          )}
        </li>
      ))}
    </ul>
  );
} 