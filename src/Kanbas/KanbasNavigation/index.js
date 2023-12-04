import React from "react";
import { Link, useLocation } from "react-router-dom";
import './NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserCircle,
    faTachometerAlt,
    faBook,
    faCalendar,
    faClock,
    faTv,
    faChevronCircleRight,
    faQuestionCircle,
    faKey,
    faUserPlus,
    faUserLarge
} from '@fortawesome/free-solid-svg-icons';


function KanbasNavigation() {
    const { pathname } = useLocation();

    const links = [
        { name: "Account", icon: faUserCircle, path: "account" },
        { name: "Dashboard", icon: faTachometerAlt, path: "dashboard" },
        { name: "Courses", icon: faBook, path: "courses" },
        { name: "Sign In", icon: faKey, path: "signin" },
        { name: "Sign Up", icon: faUserPlus, path: "signup" },
    ];

    return (
        <div className="list-group sidebar" style={{ float: "left", margin: "8px" }}>
            <div className="list-group-item sidebar-not-selected icon-spacing">
                <img src="https://i.imgur.com/RrNwVfI.png" alt="Logo" height="50px" width="50px" />
            </div>
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={"./" + link.path}
                    className={`list-group-item icon-spacing ${pathname.toLowerCase().includes(link.path)
                        ? "sidebar-selected"
                        : "sidebar-not-selected"
                        }`}
                >
                    <FontAwesomeIcon
                        icon={link.icon}
                        className={
                            link.name === "Account" ? ((pathname.includes("profile")||pathname.includes("account")) ? "grey-icon" : "") : "red-icon"
                        }
                        style={{ fontSize: "40px" }}
                    />



                    <div style={{ fontSize: "12px", textAlign: "center" }}>{link.name}</div>
                </Link>
            ))}
        </div>
    );
}

export default KanbasNavigation;