package fbla.controller;

import java.util.ArrayList;
import java.util.List;

import fbla.app.GpaCalculate;
import fbla.model.CourseEntity;
import fbla.model.GpaData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fbla.repository.CourseRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CourseController {

    @Autowired
    CourseRepository courseRepository;


    /*
     * @GetMapping("/calculateGPA") public GpaData getGpaByEmail(String Email)
     */

    @GetMapping("/calculateGPA")
    public GpaData getGpaByEmail(@RequestParam(required = false) String email) {

        GpaCalculate gpaCalculate = new GpaCalculate();

        System.out.println("==== calculateGPA / Email =====" + email);

        GpaData gpaData = new GpaData();

        try {
             ArrayList<CourseEntity> courseList = new ArrayList<CourseEntity>();

             courseRepository.findByEmail(email).forEach(courseList::add);

             gpaData.setStudentname(courseList.get(0).getStudentname());
             gpaData.setStudentid(courseList.get(0).getStudentid());
             gpaData.setGpaUnweighted(gpaCalculate.getGPA(courseList));
             gpaData.setGpaWeighted(gpaCalculate.getWeightedGpa(courseList));
             gpaData.setTotalCredit(gpaCalculate.getTotalCredit(courseList));

             return gpaData;

        } catch (Exception e) {
             return gpaData;
        }

    }

    /*
     * @GetMapping("/courses") public ResponseEntity<List<CourseEntity>> getAllCourses(@RequestParam(required = false) String email)
     */

    @GetMapping("/courses")
    public ResponseEntity<List<CourseEntity>> getAllCourses(@RequestParam(required = false) String email) {

        System.out.println("==== getAllCourses / email =====" + email);

        try {
            List<CourseEntity> courses = new ArrayList<CourseEntity>();

            if (email == null) {
              courses = null;
              //courseRepository.findAll().forEach(courses::add);
            } else {
              courseRepository.findByEmail(email).forEach(courses::add);
            }

            if (courses.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(courses, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * @GetMapping("/courses") public ResponseEntity<CourseEntity> createCourse(@RequestBody CourseEntity course)
     */

    @PostMapping("/courses")
    public ResponseEntity<CourseEntity> createCourse(@RequestBody CourseEntity course) {
        try {
            ArrayList<CourseEntity> courseList = new ArrayList<CourseEntity>();
            courseRepository.findByEmail(course.getEmail()).forEach(courseList::add);

            String studentid = courseList.get(0).getStudentid();;
            String studentname = courseList.get(0).getStudentname();

            CourseEntity courseEntity = courseRepository.save(
                new CourseEntity(studentid, studentname, course.getEmail(),
                      course.getCourse(), course.getSchoolYear(), course.getQuarter(),
                      course.getCredit(), course.getGrade(), course.getPercentGrade(),
                      course.getWeight()
            ));

            return new ResponseEntity<>(courseEntity, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}