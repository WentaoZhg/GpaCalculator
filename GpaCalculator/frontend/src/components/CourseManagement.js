// Importing modules. Frontend library for building UI
import React, { Component } from "react";
// Database with authentication information
import {getAuth} from 'firebase/auth';
// Importing class,  for managing user data (backend database)
import CourseDataService from "../services/CourseDataService";

export default class AddCourse extends Component {

    /*
     *   constructor()
     */
    constructor(props) {

        super(props);

        // Bind, Connects input values with objects
        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.onChangeSchoolYear = this.onChangeSchoolYear.bind(this);
        this.onChangeQuarter = this.onChangeQuarter.bind(this);
        this.onChangeCredit = this.onChangeCredit.bind(this);
        this.onChangeGrade = this.onChangeGrade.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);

        this.saveCourse = this.saveCourse.bind(this);
        this.newCourse = this.newCourse.bind(this);

        const auth = getAuth();
        const authemail = auth.currentUser.email;

        // Set default values
        this.state = {
           courses: [],
            errors: [],
            id: null,
            email: authemail,
            course: "",
            schoolYear: "",
            quarter: "",
            //credit: 0.0,
            grade: "",
            weight: "",
            submitted: false
        };
        this.searchByEmail();
    }

    /*
     * This function is used to search for courses by email
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
     *  This function is used to set the new course
     *  --- Sets values back to default when adding another course
     */
    newCourse() {
        this.setState({
            id: null,
            course: "",
            schoolYear: "",
            quarter: "",
            credit: "",
            grade: "",
            weight: "",
            submitted: false
        });
    }

    /*
     *  This function is used to check if the course already exists
     */
    isCourseExists(data) {
        let filteredCourses = this.state.courses.filter(
            (course) =>
            course.course.toLowerCase() === (data.course.toLowerCase())
        );
        filteredCourses = filteredCourses.filter(
            (course) =>
            course.schoolYear.toLowerCase() === (data.schoolYear.toLowerCase())
        );
        filteredCourses = filteredCourses.filter(
            (course) =>
            course.quarter.toLowerCase() === (data.quarter.toLowerCase())
        );
        return filteredCourses.length > 0;
    }
    
    /*
     *  This function is used to save the course information to database
     *  --- Saves the information in form to database
     */
    saveCourse() {
        var data = {
            email: this.state.email,
            course: this.state.course,
            schoolYear: this.state.schoolYear,
            quarter: this.state.quarter,
            credit: this.state.credit,
            grade: this.state.grade.toUpperCase(),
            percentGrade: this.state.percentGrade,
            weight: this.state.weight.toUpperCase()
        };

        // Error message conditions
        var flag_err = 0;
        const errors = {};
        if ( !data.course ) {
            errors.courseName = '* Course is required';
            flag_err = 1;
        }
        if ( !data.schoolYear ) {
            errors.schoolYear = '* School year is required';
            flag_err = 1;
        }
        if ( !data.quarter ) {
            errors.quarter = '* Quarter is required';
            flag_err = 1;
        }
        if ( !data.credit ) {
            errors.credit = '* Credit is required';
            flag_err = 1;
        }
        else if (isNaN(data.credit)) {
            errors.credit = '* Credit must be a number';
            flag_err = 1;
        }
        if ( !data.grade ) {
            errors.grade = '* Grade is required (A, A-, B+, B, ...)';
            flag_err = 1;
        }
        else if (data.grade !== 'A' && data.grade !== 'A-' && data.grade !== 'B+' && data.grade !== 'B' &&
            data.grade !== 'B-' && data.grade !== 'C+' && data.grade !== 'C' && data.grade !== 'C-' &&
            data.grade !== 'D+' && data.grade !== 'D' && data.grade !== 'D-' && data.grade !== 'F') {
            errors.gradeValue = '* Grade must be a valid letter grade';
            flag_err = 1;
        }
        if ( !data.weight ) {
            errors.weight = '* weight is required';
            flag_err = 1;
        }

        if( flag_err === 1 && errors.courseName == null ) errors.courseName = '  .';
        if( flag_err === 1 && errors.schoolYear == null ) errors.schoolYear = '  .';
        if( flag_err === 1 && errors.quarter == null ) errors.quarter = '  .';
        if( flag_err === 1 && errors.credit == null ) errors.credit = '  .';
        if( flag_err === 1 && errors.grade == null ) errors.grade = '  .';
        if( flag_err === 1 && errors.weight == null ) errors.weight = '  .';

        if (this.isCourseExists(data)) {
            errors.courseExists = '* Course already exists';
            flag_err = 1;
        }
        
        this.setState({errors: errors});

        // Saves course if there's no errors
        if (flag_err === 0) {
            CourseDataService.create(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        email: response.data.email,
                        course: response.data.course,
                        schoolYear: response.data.schoolYear,
                        quarter: response.data.quarter,
                        credit: response.data.credit,
                        grade: response.data.grade,
                        percentGrade: response.data.percentGrade,
                        weight: response.data.weight,
                        submitted: true
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    /*
     *  This function is used to get the new value of course
     *  --- Updates course variable when there is a change
     */
    onChangeCourse(e) {
        this.setState({
            course: e.target.value
        });
    }

    /*
     *  This function is used to get the new value of SchoolYear
     *  --- Updates schoolYear variable when there is a change
     */
    onChangeSchoolYear(e) {
        this.setState({
            schoolYear: e.target.value
        });
    }

    /*
     *   This function is used to get the new value of quarter
     *   --- Updates quarter variable when there is a change
     */
    onChangeQuarter(e) {
        this.setState({
            quarter: e.target.value
        });
    }

    /*
     *   This function is used to get the new value of credit
     *   --- Updates credit variable when there is a change
     */
    onChangeCredit(e) {
        this.setState({
            credit: e.target.value
        });
    }

    /*
     *   This function is used to get the new value of grade
     *   --- Updates grade variable when there is a change
     */
    onChangeGrade(e) {
        this.setState({
            grade: e.target.value
        });
    }

    /*
     *   This function is used to get the new value of weight
     *   --- Updates weight variable when there is a change
     */
    onChangeWeight(e) {
        this.setState({
            weight: e.target.value
        });
    }

  /*
   *   This function is used to render the web page
   */
  render() {
    const { errors } = this.state;

    return (

        <div className="submit-form col-md-12">

            {this.state.submitted ? (
                <div>

                    {/* --- Success message */}
                    <div className="col-sm-12"><p>&nbsp;</p></div>
                    <div className="col-sm-12"><strong><h3>Course: </h3></strong></div>

                    <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><strong>Course Name: </strong></label>{" "}
                        {this.state.course}
                    </div>

                    <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><strong>Credits: </strong></label>{" "}
                        {this.state.credit}
                    </div>

                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><strong>Grade: </strong></label>{" "}
                        {this.state.grade}
                    </div>

                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><strong>Weight: </strong></label>{" "}
                        {this.state.weight}
                    </div>

                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><strong>School Year:</strong></label>{" "}
                        {this.state.schoolYear}
                    </div>

                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><strong>Quarter:</strong></label>{" "}
                        {this.state.quarter}
                    </div>

                    <h4>was successfully added!</h4>
                    
                    <div className="col-sm-12">&nbsp;</div>
                    <div>
                        <h4>To add more courses, click the button: &nbsp;&nbsp;
                            <button className="btn btn-success" onClick={this.newCourse}> Add Course </button>
                        </h4>
                    </div>
                </div>

            ) : (

                <div className="input-group row">

                    {/* Instructions */}
                    <div className="col-sm-12">&nbsp;</div>
                    <div className="col-sm-12">
                        <h4>To add a new course, fill the form and click the SUBMIT button:</h4>
                    </div>
                    <div className="col-sm-12">&nbsp;</div>

                    {/* Error message for course */}
                    <div className="col-sm-6">
                        {errors.courseName &&
                            <span style={{color: "red"}} className="error-message">
                                {errors.courseName}
                            </span>
                         }
                         <span className="input-group-text">
                             <label htmlFor="course">Course</label>&nbsp;
                             <input
                                 type="text"
                                 className="form-control"
                                 id="course"
                                 required
                                 value={this.state.course}
                                 onChange={this.onChangeCourse}
                                 name="course"
                                 placeholder="Enter the course name"
                             />
                          </span>
                    </div>
                    <div className="col-sm-6">
                        {/* Error message for credit */}
                        {errors.credit &&
                             <span style={{color: "red"}} className="error-message">
                                {errors.credit}
                             </span>
                        }

                        {/* Error message for credit */}
                        <span className="input-group-text"><label htmlFor="credit">Credits</label>&nbsp;
                            <input
                                  type="text"
                                  className="form-control"
                                  id="credit"
                                  required
                                  value={this.state.credit}
                                  onChange={this.onChangeCredit}
                                  name="credit"
                                  placeholder="Enter the number of credits"
                            />
                        </span>
                    </div>

                    <p></p>

                    <div className="col-sm-6">
                        {/* Error message for grade */}
                        {errors.grade &&
                            <span style={{color: "red"}} className="error-message">{errors.grade}</span>
                        }
                        {errors.gradeValue &&
                            <span style={{color: "red"}} className="error-message">{errors.gradeValue}</span>
                        }
                        {/* Error message for grade */}
                        <span className="input-group-text">
                            <label htmlFor="grade">Grade</label>&nbsp;
                            <input
                                type="text"
                                className="form-control"
                                id="grade"
                                required
                                value={this.state.grade.toUpperCase()}
                                onChange={this.onChangeGrade}
                                name="grade"
                                placeholder="Enter the letter grade (A, A-, B+, B, ...)"
                            />
                        </span>
                    </div>

                    <div className="col-sm-6">
                        {errors.weight &&
                            <span style={{color: "red"}} className="error-message">
                                {errors.weight}
                            </span>
                        }
                        <span className="input-group-text">
                            <label htmlFor="Weight">Weight</label>&nbsp;
                            <select name="weight" id="weight" required onChange={this.onChangeWeight}>
                                <option value="" disabled selected> ------------------------------ </option>
                                <option value="REGULAR">Regular</option>
                                <option value="HONORS">Honors</option>
                                <option value="AP">Advanced Placement (AP)</option>
                                <option value="IB">International Baccalaureate (IB)</option>
                            </select>
                        </span>
                    </div>

                    <p></p>

                    <div className="col-sm-6">
                        {errors.schoolYear &&
                            <span style={{color: "red"}} className="error-message">
                                {errors.schoolYear}
                            </span>
                        }
                        <span className="input-group-text">
                            <label htmlFor="schoolYear">Year of school </label>&nbsp;

                            <select name="schoolYear" id="schoolYear" required onChange={this.onChangeSchoolYear}>
                                <option value="" disabled selected> ---------- </option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </span>
                    </div>

                    <div className="col-sm-6">
                        {errors.quarter &&
                            <span style={{color: "red"}} className="error-message">
                                {errors.quarter}
                            </span>
                        }
                        <span className="input-group-text">
                            <label htmlFor="quarter">Quarter</label>&nbsp;
                            <select name="quarter" id="quarter" required onChange={this.onChangeQuarter}>
                                <option value="" disabled selected> ---------- </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </span>
                    </div>

                    <div className="col-sm-12"><p>&nbsp;
                        {errors.courseExists &&
                            <span style={{color: "red"}} className="error-message">
                                {errors.courseExists}
                            </span>
                        }
                        </p>
                    </div>

                    <div className="col-sm-12">
                        <center>
                        <button onClick={this.saveCourse} className="btn btn-success">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                        </center>
                    </div>
                </div>
                )
            }
        </div>
    );
  }
}