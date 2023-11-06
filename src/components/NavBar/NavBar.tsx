import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/theunion.png";
import "./NavBar.css";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 glass">
      <a className="navbar-brand" href="#">
        <img
          src={logo}
          width="auto"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
      </a>

      <Link to="/home" className="nav-link ms-3">
        Home
      </Link>

      <Link to="/patients" className="nav-link ms-3">
        Patients
      </Link>

      <Link to="/vot-patients" className="nav-link ms-3">
        VOT Patients
      </Link>

      <Link to="/add-patient" className="nav-link ms-3">
        Add Patient
      </Link>

      <Link
        to="/login"
        className="ms-auto nav-link"
        onClick={() => handleLogout()}
      >
        Log Out
      </Link>
    </nav>
  );
};

export default NavBar;
