import React from "react";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";

function App() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui, Arial, sans-serif" }}>
      <h1>OTT App (Frontend)</h1>
      <AddMovie />
      <MovieList />
    </div>
  );
}

export default App;
