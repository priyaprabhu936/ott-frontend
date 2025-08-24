import { useState } from "react";
import Movies from "./Movies";
import Login from "./Login";

function App() {
  // Check if token already stored in browser
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 OTT App</h1>

      {auth ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Movies />
        </div>
      ) : (
        <Login setAuth={setAuth} />
      )}
    </div>
  );
}

export default App;
