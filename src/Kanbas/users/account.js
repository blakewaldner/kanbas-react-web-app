import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function Account() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    navigate("/kanbas/signin");
  };
  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div className="body" style={{ width: '150%' }}>
      <h1>Account</h1>
      <hr/>
      {account && (
        <div>
          <input value={account.password}
          className="form-control my-2"
            onChange={(e) => setAccount({
              ...account,
              password: e.target.value
            })} />
          <input value={account.firstName}
          className="form-control my-2"
          placeholder="First Name"
            onChange={(e) => setAccount({
              ...account,
              firstName: e.target.value
            })} />
          <input value={account.lastName}
          className="form-control my-2"
          placeholder="Last Name"
            onChange={(e) => setAccount({
              ...account,
              lastName: e.target.value
            })} />

          <input 
          className="form-control my-2"
            type="date"
            value={account.dob}
            onChange={(e) => setAccount({
              ...account,
              dob: e.target.value
            })} />
          <input value={account.email}
          className="form-control my-2"
          placeholder="Email"
            onChange={(e) => setAccount({
              ...account,
              email: e.target.value
            })} />
          <select 
          className="form-select my-2 "
          onChange={(e) => setAccount({
            ...account,
            role: e.target.value
          })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button className="btn btn-primary my-1 w-100" onClick={save}>
            Save
          </button>
          <button className="btn btn-danger my-1 w-100" onClick={signout}>
            Signout
          </button>
          <Link to="/kanbas/admin/users" className="btn btn-warning my-1 w-100">
            Users
          </Link>
        </div>
      )}
    </div>
  );
}
export default Account;