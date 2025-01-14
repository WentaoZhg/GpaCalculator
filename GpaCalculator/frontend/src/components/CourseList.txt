// Frontend library for building UI
import React, {Component} from "react";
// Manages user data
import CourseDataService from "../services/CourseDataService";
import {Link} from "react-router-dom";
// Database with authentication information
import {getAuth} from 'firebase/auth';

export default class CourseList extends Component {

    /*
     * This function is used to initialize the course list
     */
    constructor(props) {
        super(props);
        this.searchByEmail = this.searchByEmail.bind(this);
        this.setActiveCourse = this.setActiveCourse.bind(this);
        this.onChangeSearchCourseTerm = this.onChangeSearchCourseTerm.bind(this);
        this.onChangeSearchYearTerm = this.onChangeSearchYearTerm.bind(this);
        //this.removeSelectedCoursesByEmail = this.removeSelectedCoursesByEmail(this);
        //this.removeAllCoursesByEmail = this.removeAllCoursesByEmail(this);

        const auth = getAuth();
        const authemail = auth.currentUser.email;

        this.state = {
            courses: [],
            filteredCourses: [],
            credit: [],
            currentCourse: null,
            currentIndex: -1,
            email: "",
            searchCourseTerm: "",
            searchYearTerm: "",
            isSearchYear: false
        };

        this.state.email = authemail;
        this.searchByEmail();

    }

    /*
     * This function is used to search for courses by email
     * --- Allows webpage to display up to date information
     */
    searchByEmail() {
        this.setState({
            currentCourse: null,
            currentIndex: -1
        });

        CourseDataService.findByEmail(this.state.email)
            .then(response => {
                this.setState({
                    courses: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    /*
     * This function is used to change the search course term
     */
    onChangeSearchCourseTerm(event) {
        this.setState({ searchCourseTerm: event.target.value, isSearchYear: false });
      }

    /*
     * This function is used to change the search year term
     */
    onChangeSearchYearTerm(event) {
        this.setState({ searchYearTerm: event.target.value, isSearchYear: true});
    }

    /*
     * This function is used to remove selected course
     */
    removeSelectedCoursesByEmail() {
        const confirmDelete = window.confirm('Are you sure you want to delete the selected courses?');
        if (confirmDelete) {
            // Perform the delete operation here

            //CourseDataService.deleteSelectedByEmail(this.state.email)
            //    .then(response => {
            //        console.log(response.data);
            //        this.refreshList();
            //    })
            //    .catch(e => {
            //        console.log(e);
            //    });
        }
    }

    /*
     * This function is used to remove all the course
     */
    removeAllCoursesByEmail() {
        const confirmDelete = window.confirm('Are you sure you want to delete all courses for this user?');
        if (confirmDelete) {
        // Perform the delete operation here
    
        CourseDataService.deleteAllByEmail(this.state.email)
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    /*
     * This function is used to set the active course
     * --- Highlights course
     */
    setActiveCourse(course, index) {
        this.setState({
            currentCourse: course,
            currentIndex: index
        });
    }

    /*
     * This function is used to render the course list
     */
    render() {
    const { courses, currentIndex } = this.state;

      const filteredCourses = this.state.courses.filter(
        (course) => {
            if (this.state.isSearchYear) {
                return course.schoolYear.toLowerCase().includes(this.state.searchYearTerm.toLowerCase());
            } else {
                return course.course.toLowerCase().includes(this.state.searchCourseTerm.toLowerCase());
            }
        }
    );
        return (
            <div className="list row">

                <div className="col-md-12"><p></p></div>

                <div className="col-md-6">
                    <h6><strong>&nbsp;Search by school year:</strong></h6>
                </div>

                <div className="col-md-6">
                    <h6><strong>&nbsp;Search by course name:</strong></h6>
                </div>

                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter School Year"
                        value={this.state.searchYearTerm}
                        onChange={this.onChangeSearchYearTerm}
                    />
                </div>

                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Name"
                        value={this.state.searchCourseTerm}
                        onChange={this.onChangeSearchCourseTerm}
                    />
                </div>

                <div className="col-md-12">
                    <br></br>
                    <center><h3><strong>Courses</strong></h3></center>
                </div>


                <div className="col-md-12"><p></p></div>
                <div className="col-md-5">
                    <center><h6><strong>Course Name</strong></h6></center>
                </div>
                <div className="col-md-2">
                    <center><h6><strong>School Year</strong></h6></center>
                </div>
                <div className="col-md-1">
                    <center><h6><strong>Quarter</strong></h6></center>
                </div>
                <div className="col-md-1">
                    <center><h6><strong>Credit</strong></h6></center>
                </div>
                <div className="col-md-1">
                    <center><h6><strong>Grade</strong></h6></center>
                </div>
                <div className="col-md-2">
                    <center><h6><strong>Weight</strong></h6></center>
                </div>

                <div className="col-md-5">
                    <ul className="list-group">
                        {filteredCourses && filteredCourses.map((course, index) => (
                            <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveCourse(course, index)} key={index}>
                                {course.course}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-2">
                    <ul className="list-group">
                        {filteredCourses && filteredCourses.map((course, index) => (
                            <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveCourse(course, index)} key={index}>
                                {course.schoolYear}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-1">
                    <ul className="list-group">
                        {filteredCourses && filteredCourses.map((course, index) => (
                            <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveCourse(course, index)} key={index}>
                                {course.quarter}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-1">
                    <ul className="list-group">
                        {filteredCourses && filteredCourses.map((course, index) => (
                            <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveCourse(course, index)} key={index}>
                                {course.credit}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-1">
                    <ul className="list-group">
                        {filteredCourses && filteredCourses.map((course, index) => (
                            <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveCourse(course, index)} key={index}>
                                {course.grade}
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="col-md-2">
                    <ul className="list-group">
                        {filteredCourses && filteredCourses.map((course, index) => (
                            <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveCourse(course, index)} key={index}>
                                {course.weight}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-12"><p></p></div>

                <div className="col-md-12">

                    <button className="m-3 btn btn-sm btn-danger" onClick={this.removeSelectedCoursesByEmail}>
                        Remove Selected Course
                    </button>


                    <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllCoursesByEmail}>
                        Remove All Courses
                    </button>

                </div>
                <div className="col-md-12"><p>&nbsp;</p></div>
                <div className="col-md-12"><p></p></div>
            </div>
        );
    }
}
