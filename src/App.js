import { Fragment, useState } from "react";
import "./App.css";
import UserCard from "./components/user-card/user-card";

export default function App() {
  // State to store the input from the search bar
  const [inputValue, setInputValue] = useState("");

  // State to store the list of GitHub users returned from the API
  const [results, setResults] = useState([]);

  // Function to handle changes in the input field
  function handleOnChange(event) {
    setInputValue(event.target.value); // Update inputValue state as user types
  }

  // GitHub API base URL
  const API_URL = "https://api.github.com";

  // Function to fetch GitHub users based on the search query
  async function findGithubAccounts(query) {
    try {
      // Sending a request to GitHub API to search users
      const response = await fetch(`${API_URL}/search/users?q=${query}`);
      const json = await response.json();
      return json.items || []; // Return the list of users, or an empty array if none
    } catch (e) {
      throw new Error(e); // Handle errors if API call fails
    }
  }

  // Function to trigger when the "Search" button is clicked
  async function onSearchSubmit() {
    const results = await findGithubAccounts(inputValue); // Get search results
    setResults(results); // Update the results state to display the data
  }

  // JSX returned by the component
  return (
    <main className="main">
      {/* Project Heading */}
      <h2>Project 5: GitHub Account Finder</h2>

      {/* Input field and search button */}
      <div className="search-form">
        <input
          placeholder="Enter username or email"
          onChange={handleOnChange} // Handle user input
        />
        <button onClick={onSearchSubmit}>Search</button>
      </div>

      {/* Display the search results */}
      <h3>Results</h3>
      <div id="results">
        <Fragment>
          {/* Loop through each user and render a UserCard component */}
          {results.map((user) => (
            <UserCard
              key={user.id} // Add a unique key for each item (recommended in React lists)
              profileLink={user.avatar_url}
              accountLink={user.html_url}
              username={user.login}
            />
          ))}
        </Fragment>
      </div>
    </main>
  );
}
