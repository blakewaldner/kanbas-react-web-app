import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: ""
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            const BASE_API = process.env.REACT_APP_BASE_API_URL;
            console.log(BASE_API)
            await client.signup(credentials);
            navigate("/kanbas/account");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>

            <h1>Signup</h1>
            <hr />
            {error && <div>{error}</div>}
            <input
                value={credentials.username}
                className="form-control my-2"
                placeholder="Enter Username"
                onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value
                })} />
            <input
                value={credentials.password}
                className="form-control my-2"
                placeholder="Enter Password"
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })} />
            <button class="btn btn-primary my-2" onClick={signup}>
                Signup
            </button>
        </div>
    );
}
export default Signup;