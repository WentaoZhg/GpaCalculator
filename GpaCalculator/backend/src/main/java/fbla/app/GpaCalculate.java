package fbla.app;

/*
 * This class is used to calculate the GPA of a student.
 */

import java.util.ArrayList;
import fbla.model.CourseEntity;

public class GpaCalculate {

    /**
     * Constructor
     */
    public GpaCalculate() { }


    /**
     * This method calculates the total credit of a student.
     */
    public double getTotalCredit(ArrayList<CourseEntity> courseList)  {
        double totCredit = 0f;

        for (CourseEntity course : courseList) {
            double credit = course.getCredit();
            totCredit = totCredit + credit;
        }

        return totCredit;
    }

    /**
     * This method calculates the GPA of a student.
     */
    public double getGPA(ArrayList<CourseEntity> courseList)  {
        double gpa = 0.f;
        double totCredit = getTotalCredit(courseList);
        double totalGPA = 0f;
        double avgGPA = 0f;

        for (CourseEntity course : courseList) {

            String grade = course.getGrade();
            double credit = course.getCredit();

            gpa = gradeToGPA(grade);
            totalGPA = totalGPA + gpa * credit;
        }

        avgGPA = totalGPA / totCredit;

        return avgGPA;
    }

    /**
     * This method calculates the weighted GPA of a student.
     */
    public double getWeightedGpa(ArrayList<CourseEntity> courseList) {
        double gpa = 0.f;
        double totCredit = getTotalCredit(courseList);
        double totalGPA = 0f;
        double avgGPA = 0f;

        for (CourseEntity course : courseList) {
            String grade = course.getGrade();
            double credit = course.getCredit();
            String weight = course.getWeight();

            if ("REGULAR".equals(weight) || "regular".equals(weight)) {
                gpa = gradeToGPA(grade);
            }
            if ("HONORS".equals(weight) || "honors".equals(weight)) {
                gpa = gradeToGPA(grade) + 0.5f;
            }
            if ("AP".equals(weight) || "ip".equals(weight)) {
                gpa = gradeToGPA(grade) + 1.0f;
            }
            if ("IB".equals(weight) || "ib".equals(weight)) {
                gpa = gradeToGPA(grade) + 1.0f;
            }

            totalGPA = totalGPA + gpa * credit;
        }

        avgGPA = totalGPA / totCredit;

        return avgGPA;
    }

    /**
     * This method converts a letter grade to a GPA score.
     */
    private float gradeToGPA(String grade) {
        float gpa = 0f;
        if("A".equals(grade)) gpa = 4.0f;
        if("A-".equals(grade)) gpa = 3.66f;
        if("B+".equals(grade)) gpa = 3.33f;
        if("B".equals(grade)) gpa = 3.0f;
        if("B-".equals(grade)) gpa = 2.66f;
        if("C+".equals(grade)) gpa = 2.33f;
        if("C".equals(grade)) gpa = 2.0f;
        if("C-".equals(grade)) gpa = 1.66f;
        if("D+".equals(grade)) gpa = 1.33f;
        if("D".equals(grade)) gpa = 1.0f;
        if("D-".equals(grade)) gpa = 0.67f;
        if("F".equals(grade)) gpa = 0.0f;

        if("a".equals(grade)) gpa = 4.0f;
        if("a-".equals(grade)) gpa = 3.66f;
        if("b+".equals(grade)) gpa = 3.33f;
        if("b".equals(grade)) gpa = 3.0f;
        if("b-".equals(grade)) gpa = 2.66f;
        if("c+".equals(grade)) gpa = 2.33f;
        if("c".equals(grade)) gpa = 2.0f;
        if("c-".equals(grade)) gpa = 1.66f;
        if("d+".equals(grade)) gpa = 1.33f;
        if("d".equals(grade)) gpa = 1.0f;
        if("d-".equals(grade)) gpa = 0.67f;
        if("f".equals(grade)) gpa = 0.0f;
        return gpa;
    }

}
