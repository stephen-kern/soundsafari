import React from "react";
import Main from "./pages/main";
import { tokenRequest } from "./utils/AuthFlow";
import "./index.scss";

function App() {
  const handleAuth = () =>{
    tokenRequest();
  }
  return (
    <div className="App">
      {/* <Main /> */}
      <button onClick={handleAuth} className="login-button">
        Login
      </button>
    </div>
  );
}

export default App;
