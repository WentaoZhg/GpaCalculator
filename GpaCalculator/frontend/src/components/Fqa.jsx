import React, {useState, useEffect} from "react";

export default function Help(){

    /*
     *  helpTextArr is an array that contains the help information for the GPA Calculator
     */
    const helpTextArr =
        [
            {
                "id": 0,
                "title": "To calculate your grade point average, " +
                    "click and navigate to Calculator. Then click the Calculate GPA button. " +
                    "GPA is calculated using the grading scale provided in the " +
                    "Hillcrest school wide disclosure."
            },
            {
                "id": 1,
                "title": "Add courses by navigating to the course management page, " +
                    "fill out the required information, and hit submit."
            },
            {
                "id": 2,
                "title": "To view classes you are currently enrolled in or have " +
                    "previously taken and their grade navigate to the course list page."
            },
            {
                "id": 3,
                "title": "Course: Input the Course name"
            },
            {
                "id": 4,
                "title": "School Year: Input the grade the course was taken"
            },
            {
                "id": 5,
                "title": "Quarter: Input the quarter that the course was taken"
            },
            {
                "id": 6,
                "title": "Credit: The credits that the course is worth"
            },
            {
                "id": 7,
                "title": "Grade: The letter grade  (A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F)"
            },
            {
                "id": 8,
                "title": "Weight: Course difficulty/weight (Regular, Honors, AP, IB)"
            },
            {
                "id": 9,
                "title": "GPA: Grade point average (A = 4,  A- = 3.66,  B+ = 3.33,  B = 3,  B- = 2.66, C+ = 2.33,  C = 2,  C- = 1.66,  D+ = 1.33,  D = 1,  D- = 0.67,  F = 0)"
            },
            {
                "id": 10,
                "title": "Weighted GPA: Weighted grade point average (Honor classes are worth an extra 0.5 point, AP/IB classes are worth an extra point)"
            },
            {
                "id": 11,
                "title": "Total Credits: Total amount of credits across all courses"
            }
        ];

    /*
     * searchTerm is used to search for help information
     */
    const [searchTerm, setSearchTerm] = useState("");

    /*
     * This function is used to handle the search term
     */
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    /*
    * This function is used to check if the search term matches the help information
     */
    const matchesSearchTerm = (helpText, searchTerm) => {
        return helpText.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    /*
    * This function is used to filter the help information based on the search term
     */
    const filteredHelpTextArr = helpTextArr.filter(
        (text) =>
            matchesSearchTerm(text, searchTerm)
    );

    /*
    * This function is used to display the help information for GPA Calculator
     */
    return (
        <div className="list row">

            <div className="col-md-12"><p></p></div>
            <div className="col-md-12" style={{margin: '25px 25px 25px 25px'}}>

                <h3><strong>AHelp Page</strong></h3>

                <strong>Search:&nbsp;&nbsp;</strong>
                <input style={{margin: '10px 0px 10px 0px'}}
                           type="text"
                           className="search-input"
                           placeholder="Search help..."
                           value={searchTerm}
                           onChange={handleSearchChange}
                    />
                <div style={{margin: '25px 25px 25px 25px'}}>
                    <h5><strong>Instructions:</strong></h5>
                    {filteredHelpTextArr.map(t =>
                         <div><p>{t.title}</p></div>
                    )}
                </div>
            </div>
        </div>
    );
}