package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "semester_results")
public class SemesterResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long studentId;
    int semester;
    double sgpa;
    double cgpa;
    String status;

    public SemesterResult() {
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

    public int getSemester() {
        return semester;
    }

    public void setSemester(int v) {
        semester = v;
    }

    public double getSgpa() {
        return sgpa;
    }

    public void setSgpa(double v) {
        sgpa = v;
    }

    public double getCgpa() {
        return cgpa;
    }

    public void setCgpa(double v) {
        cgpa = v;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String v) {
        status = v;
    }
}
