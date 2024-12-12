import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BanknotesIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import "../../styles/Hamburger.css";
import { useAuth } from '../../contexts/AuthContext';


function Hamburger({ username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const {logout} = useAuth();
  const handleLogout = () => {
    console.log("HandleLogout called");
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
    console.log("After navigation");
  };

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Income", icon: BanknotesIcon, path: "/income" },
    { name: "Expenses", icon: CreditCardIcon, path: "/expenses" },
    { name: "Analytics", icon: ArrowsRightLeftIcon, path: "/analytics" },
    { name: "Profile", icon: UserCircleIcon, path: "/profile" },
  ];

  return (
    <>
      <div className="hamburger-header">
        <button
          className="hamburger-button"
          onClick={() => setIsMenuOpen(true)}
        >
          <Bars3Icon className="hamburger-icon" />
        </button>
        <div className="user-dropdown">
          <button
            className="username-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {username}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/profile")}>View Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="hamburger-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Slide Menu */}
      <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="sidebar-logo-hamburger">
          Money<span className="logo-highlight">Up</span>
        </div>
        <div className="hamburger-menu-content">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`hamburger-menu-item ${
                location.pathname === item.path ? "hamburger-active-item" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="hamburger-menu-icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hamburger;
