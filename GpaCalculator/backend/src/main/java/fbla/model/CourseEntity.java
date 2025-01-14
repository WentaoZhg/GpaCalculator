package fbla.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Courses")
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "studentid")
    private String studentid;

    @Column(name = "studentname")
    private String studentname;

    @Column(name = "email")
    private String email;

    @Column(name = "course")
    private String course;

    @Column(name = "schoolyear")
    private String schoolYear;

    @Column(name = "quarter")
    private String quarter;

    @Column(name = "credit")
    private Float credit;

    @Column(name = "grade")
    private String grade;

    @Column(name = "percentgrade")
    private Float percentGrade;

    @Column(name = "weight")
    private String weight;

    public CourseEntity() {

    }

    public CourseEntity(String studentid, String studentname, String email, String course,
                      String schoolYear, String quarter,
                      Float credit, String grade, Float percentGrade, String weight) {
        this.studentid = studentid;
        this.studentname = studentname;
        this.email = email;
        this.course = course;
        this.schoolYear = schoolYear;
        this.quarter = quarter;
        this.credit = credit;
        this.grade = grade;
        this.percentGrade = percentGrade;
        this.weight = weight;
    }

    public long getId() {
    return id;
  }

    public String getStudentid() {
    return studentid;
  }
    public void setStudentid(String studentid) {
    this.studentid = studentid;
  }

    public String getStudentname() {
    return studentname;
  }
    public void setStudentname(String studentname) {
    this.studentname = studentname;
  }

    public String getEmail() {
    return email;
  }
    public void setEmail(String email) {
    this.email = email;
  }

    public String getCourse() {
    return course;
  }
    public void setCourse(String course) {
    this.course = course;
  }

    public String getSchoolYear() {
    return schoolYear;
  }
    public void setSchoolYear(String schoolYear) {
    this.schoolYear = schoolYear;
  }

    public String getQuarter() {
    return quarter;
  }
    public void setQuarter(String quarter) {
    this.quarter = quarter;
  }

    public Float getCredit() {
    return credit;
  }
    public void setCredit(Float credit) {
    this.credit = credit;
  }

    public String getGrade() {
    return grade;
  }
    public void setGrade(String grade) {
    this.grade = grade;
  }

    public Float getPercentGrade() {
    return percentGrade;
  }
    public void setPercentGrade(Float percentGrade) {
    this.percentGrade = percentGrade;
  }

    public String getWeight() {
    return weight;
  }
    public void setWeight(String weight) {
    this.weight = weight;
  }

    @Override
    public String toString() {
        return "Course [Student ID=" + studentid + ", Student Name=" + studentname +
            ", Email=" + email + ", Course=" + course + ", School Year=" + schoolYear +
            ", Quarter=" + quarter + ", Credit=" + credit + ", Grade=" + grade +
            ", Percent Grade=" + percentGrade + ", Weight=" + weight + "]";
    }

}
