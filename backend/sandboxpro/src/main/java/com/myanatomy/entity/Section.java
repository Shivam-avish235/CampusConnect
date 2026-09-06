package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sections")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true)
    String code;
    String department;
    int year;
    int semester;
    String faculty;

    public Section() {
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String v) {
        department = v;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int v) {
        year = v;
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
