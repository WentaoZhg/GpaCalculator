import React from 'react';
import '../../css/Header.css';
import AuthDetails from "../login/AuthDetails";

function Header() {
    return (
        <header className="header">
            <img src="Hillcrest-Logo.png" alt={"Hillcrest-Logo"} className="logo"/>
            <span style={{fontSize: 40, display: "flex"}}>
                Hillcrest GPA Calculator
            </span>
            <nav style={{float: "right"}}>
                <AuthDetails/>
            </nav>
        </header>
    );
}

export default Header;
