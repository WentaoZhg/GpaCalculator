import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Navigation.css";

/*
 *   This function is used to display the navigation bar
 */
export const Navigation = () => {

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {/* <Link to={"/"} className="navbar-brand">Calculator</Link> */}

                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            Calculator
                        </Link>
                    </li>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <li className="nav-item">
                        <Link to={"/courselist"} className="nav-link">
                            Course List
                        </Link>
                    </li>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <li className="nav-item">
                        <Link to={"/addcourse"} className="nav-link">
                            Course Management
                        </Link>
                    </li>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <li className="nav-item">
                        <Link to={"/help"} className="nav-link">
                            Help
                        </Link>
                    </li>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <li className="nav-item">
                        <Link to={"/fqa"} className="nav-link">
                            F & Q
                        </Link>
                    </li>
                </div>

            </nav>
        </div>

    );

}