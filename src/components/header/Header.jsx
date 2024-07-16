import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./header.scss";
import headerIcon from "../../assets/headerIcon.svg";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <header id="header" className="header">
            <div className="header__left">
                <RxHamburgerMenu className="header__icon" />
                <form action="" className="header__search-form">
                    <IoSearchSharp className="header__search-icon" />
                    <input type="text" className="header__search-input" placeholder="search..." />
                </form>
            </div>
            <div className="header__right">
                <Link to="/" className="header__link">
                    <img src={headerIcon} alt="Header Icon" className="header__img" />
                </Link>
                <select name="language" id="language" className="header__select">
                    <option value="en" className="header__option">English</option>
                    <option value="ru" className="header__option">Russia</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
