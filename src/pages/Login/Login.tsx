import "./Login.css";
import theunion from "../../assets/theunion.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../features/auth/authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { notify } from "../../utils/toast";
import Spinner from "../../components/Spinner/Spinner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state: RootState) => state.auth.loading);
  const isLoading = loading === "pending";
  const dispatch = useDispatch<AppDispatch>();

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    if (username == "") {
      notify("Please fill username.");
    } else if (password == "") {
      notify("Please fill password.");
    } else {
      dispatch(authenticated({ username, password }));
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card my-glass-card">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <img src={theunion} alt="The Union"></img>
          </div>
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="form-control mb-4"
              value={username}
              onChange={(e) => handleUsernameChange(e)}
              required
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-4"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn login-button action-button"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
