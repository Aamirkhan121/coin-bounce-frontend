import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../api/internal";
import { resetUser } from "../../store/userSlice";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <NavLink to={"/"} className={`navbar-brand ${styles.logo} ${styles.inActiveStyle}`}>
          CoinBounce
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon">
           <IoIosMenu size={25}/>
          </span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? `nav-link ${styles.activeStyle}` : `nav-link ${styles.inActiveStyle}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"crypto"}
                className={({ isActive }) =>
                  isActive ? `nav-link ${styles.activeStyle}` : `nav-link ${styles.inActiveStyle}`
                }
              >
                CryptoCurrency
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"blogs"}
                className={({ isActive }) =>
                  isActive ? `nav-link ${styles.activeStyle}` : `nav-link ${styles.inActiveStyle}`
                }
              >
                Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"submit"}
                className={({ isActive }) =>
                  isActive ? `nav-link ${styles.activeStyle}` : `nav-link ${styles.inActiveStyle}`
                }
              >
                Submit a Blog
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  className={`nav-link ${styles.signOutButton}`}
                  onClick={handleSignout}
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to={"login"}
                    className={({ isActive }) =>
                      isActive ? `nav-link ${styles.activeStyle}` : `nav-link ${styles.inActiveStyle}`
                    }
                  >
                    <button className={styles.logInButton}>Log In</button>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"signup"}
                    className={({ isActive }) =>
                      isActive ? `nav-link ${styles.activeStyle}` : `nav-link ${styles.inActiveStyle}`
                    }
                  >
                    <button className={styles.signUpButton}>Sign Up</button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className={styles.separator}></div>
    </>
  );
};

export default Navbar;

