package fbla.model;
public class GpaData {
    private String studentname;
    private String studentid;
    private double gpaUnweighted;
    private double gpaWeighted;
    private double totalCredit;

    public GpaData() {
    }

    public GpaData(String studentname, String studentid,
                   double gpaUnweighted, double gpaWeighted, double totalCredit) {
        this.studentname = studentname;
        this.studentid = studentid;
        this.gpaUnweighted = gpaUnweighted;
        this.gpaWeighted = gpaWeighted;
        this.totalCredit = totalCredit;
    }

    public String getStudentname() {
       return studentname;
    }
    public void setStudentname(String studentname) {
       this.studentname = studentname;
    }

    public String getStudentid() {
       return studentid;
    }
    public void setStudentid(String studentid) {
       this.studentid = studentid;
    }

    public double getGpaUnweighted() {
       return gpaUnweighted;
    }
    public void setGpaUnweighted(double gpaUnweighted) {
       this.gpaUnweighted = gpaUnweighted;
    }

    public double getGpaWeighted() {
        return gpaWeighted;
    }
    public void setGpaWeighted(double gpaWeighted) {
        this.gpaWeighted = gpaWeighted;
    }

    public double getTotalCredit() {
        return totalCredit;
    }
    public void setTotalCredit(double totalCredit) {
        this.totalCredit = totalCredit;
    }

    @Override
    public String toString() {
        return "GpaData [Student Name =" + studentname + ", Student ID=" + studentid +
                ", GPA =" + gpaUnweighted + ", Weighted GPA=" + gpaWeighted +
                ", Total Credit=" + totalCredit + "]";
    }
}