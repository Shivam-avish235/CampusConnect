package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true)
    String code;
    @Column(nullable = false)
    String name;
    String hod;
    int students;
    int faculty;
    String status = "Active";

    public Department() {
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getHod() {
        return hod;
    }

    public int getStudents() {
        return students;
    }

    public int getFaculty() {
        return faculty;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long v) {
        id = v;
    }

    public void setCode(String v) {
        code = v;
    }

    public void setName(String v) {
        name = v;
    }

    public void setHod(String v) {
        hod = v;
    }

    public void setStudents(int v) {
        students = v;
    }

    public void setFaculty(int v) {
        faculty = v;
    }

    public void setStatus(String v) {
        status = v;
    }
}
