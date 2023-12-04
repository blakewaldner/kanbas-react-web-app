import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signin = async () => {
    try {
      await client.signin(credentials);
      navigate("/kanbas/account");
    }
    catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signin</h1>
      <hr />
      {error && <div>{error}</div>}
      <input value={credentials.username}
        className="form-control my-2"
        placeholder="Enter Username"
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      <input value={credentials.password}
        className="form-control my-2"
        placeholder="Enter Password"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <button class="btn btn-primary my-2" onClick={signin}> Signin </button>
    </div>
  );
}
export default Signin;