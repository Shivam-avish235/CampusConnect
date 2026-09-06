package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subject_marks")
public class SubjectMark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long studentId;
    String subject;
    int semester;
    double marks;
    double maxMarks;
    String grade;

    public SubjectMark() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long v) {
        studentId = v;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String v) {
        subject = v;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int v) {
        semester = v;
    }

    public double getMarks() {
        return marks;
    }

    public void setMarks(double v) {
        marks = v;
    }

    public double getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(double v) {
        maxMarks = v;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String v) {
        grade = v;
    }
}
