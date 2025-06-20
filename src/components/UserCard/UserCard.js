import React from "react";
import "./UserCard.css";

export default function UserCard({ profileLink, accountLink, username, userType }) {
  return (
    <a
      href={accountLink}
      target="_blank"
      rel="noopener noreferrer"
      className="user-card user-card-link"
      tabIndex={0}
      aria-label={`Open GitHub profile for ${username}`}
    >
      <img
        src={profileLink}
        alt={`Avatar of ${username}`}
        className="avatar"
        width="64"
        height="64"
      />
      <span className="username-link">{username}</span>
      {userType && <div className="user-type">{userType}</div>}
      <a
        href={accountLink}
        target="_blank"
        rel="noopener noreferrer"
        className="profile-btn"
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
      >View Profile</a>
    </a>
  );
} 