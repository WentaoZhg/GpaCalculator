// Frontend library for building UI
import React, { Component } from "react";
// Links to other pages
import { withRouter } from '../common/with-router';
import {Link} from "react-router-dom";
// Gets login details
import {getAuth} from 'firebase/auth';
// Calculates GPA
import CourseDataService from "../services/CourseDataService";

class GpaCalculate extends Component {

    /*
     *   Contructor, to initialize the GPA calculator
     *   --- Calls calculateGPA when user is logged in
     */
    constructor(props) {
        super(props);
        this.calculateGPA = this.calculateGPA.bind(this);
        this.gotoCourseList = this.gotoCourseList.bind(this);
        this.gotoCourseManagement = this.gotoCourseManagement.bind(this);
        this.gotoHelp = this.gotoHelp.bind(this);

        // Set default values
        this.state = {
            gpaData: {
                gpaUnweighted: 4.0,
                gpaWeighted: 5.0,
                totalCredit: 0.0
            },
            showgpa: false,
            email: null,
        };

        // Calls calculateGPA when user is logged in
        const auth = getAuth();
        if(auth.currentUser !== null) {
            const authemail = auth.currentUser.email;

            this.state.email = authemail;

            this.calculateGPA();
        }
    }

    /*
     *   This function is used to calculate and shows GPA
     */
    calculateGPA() {
       
       //Checks that a user is logged in
        if(getAuth().currentUser !== null) {

           // Displays GPA
            this.setState({
                showgpa: true
            });

            // Gets user data and calculates GPA
            CourseDataService.calculateGPA(this.state.email)
                .then(response => {
                    this.setState({
                        gpaData: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                        console.log(e);
                    }
                );
        // Tells user to sign in if they aren't
        } else {
            alert("Please sign in to calculate GPA");
        }
    }

    /*
     *   This function is used to navigate to the course list
     */
    gotoCourseList() {
        this.props.router.navigate('/courselist');
    }

    /*
     *   This function is used to navigate to course management
     */
    gotoCourseManagement() {
        this.props.router.navigate('/addcourse');
    }

    /*
     *   This function is used to navigate to Help
     */
    gotoHelp() {
        this.props.router.navigate('/help');
    }

    /*
     *   This function is used to render the GPA calculator
     */
    render() {
        const { showgpa, gpaData } = this.state;
        return (
            <div className="list row">

                {/* Title and description */}
                <div className="col-md-12">
                    <center><h2><strong>Hillcrest High School</strong></h2></center>
                </div>
                <div className="col-md-12">
                    <center><h2><strong>Grade Point Average Calculator</strong></h2></center>
                </div>

                <div><p></p></div>
                <div>
                    This calculator was built for Hillcrest High School students to make calculating
                    your weighted and unweighted grade point averages easier. It includes a course
                    list that displays courses that you are currently or previously enrolled in
                    and a grade point average calculator.
                </div>

                <p></p>

                {/* Displays total amount of credits, standard GPA, and weighted GPA */}
                {showgpa ? (
                    <div className="list row">
                        <p></p>
                        <div className="col-md-3"><center><h5><strong>&nbsp;&nbsp;&nbsp;&nbsp;Total Credit:</strong>
                        </h5></center>
                        </div>
                        <div className="col-md-1">{gpaData.totalCredit} </div>

                        <div className="col-md-1"><center><h5><strong>&nbsp;&nbsp;GPA:</strong></h5></center></div>
                        <div className="col-md-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{gpaData.gpaUnweighted.toFixed(2)}</div>

                        <div className="col-md-3"><center><h5><strong>Weighted GPA:</strong></h5></center></div>
                        <div className="col-md-1">{gpaData.gpaWeighted.toFixed(2)}</div>

                        <p></p>

                    </div>
                ) : (
                    <div>
                    {/* Displays calculate GPA button and instructions */}
                        <div className="col-md-12">
                            <p>To Calculate GPA, click the button below: </p>

                            <center>
                                <button type="button" className="btn btn-success" onClick={this.calculateGPA}>
                                    &nbsp; Calculate GPA &nbsp;
                                </button>
                            </center>
                        </div>
                    </div>
                )}

                <div><p></p></div>
                <div className="col-md-12">
                {/* Instructions for how to view or modify courses and links to those pages */}
                    <li>
                        To view your courses, click <Link to={"/courselist"}> Course List </Link>
                    </li>
                </div>

                <div><p></p></div>
                <div className="col-md-12">
                    <li>
                        To add or modify your courses, click <Link to={"/addcourse"}> Course Management </Link>
                    </li>
                </div>

            </div>

        );
    }
}

export default withRouter(GpaCalculate);