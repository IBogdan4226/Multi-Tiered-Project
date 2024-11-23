package com.multitiered.multitiered.POJO;

public class GradeCount {
    private String grade;
    private int countStudent;


    public GradeCount(String grade, int countStudent) {
        this.grade = grade;
        this.countStudent = countStudent;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getCountStudent() {
        return countStudent;
    }

    public void setCountStudent(int countStudent) {
        this.countStudent = countStudent;
    }
}
