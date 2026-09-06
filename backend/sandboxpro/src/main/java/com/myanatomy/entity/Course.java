package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true)
    String code;
    @Column(nullable = false)
    String name;
    String department;
    int credits;
    int semester;
    String faculty;

    public Course() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String v) {
        code = v;
    }

    public String getName() {
        return name;
    }

    public void setName(String v) {
        name = v;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String v) {
        department = v;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int v) {
        credits = v;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int v) {
        semester = v;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String v) {
        faculty = v;
    }
}
