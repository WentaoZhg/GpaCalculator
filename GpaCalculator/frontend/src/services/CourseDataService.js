import http from "../common/http-common";

class CourseDataService {

    /*
     * Get all courses by the email of a user
     */
    findByEmail(email) {
        return http.get(`/courses?email=${email}`);
    }

    /*
     * Calculate the GPA of a user by their email
     */
    calculateGPA(email) {
        return http.get(`/calculateGPA?email=${email}`);
    }

    /*
     * Add a new course to the database
     */
    create(data) {
        return http.post("/courses", data);
    }

}

export default new CourseDataService();