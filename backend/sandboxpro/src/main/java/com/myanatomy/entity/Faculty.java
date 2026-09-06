package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "faculty")
public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true)
    String facultyId;
    @Column(nullable = false)
    String name;
    @Column(nullable = false, unique = true)
    String email;
    String phone;
    String department;
    String designation;
    @Column(length = 2000)
    String courses;
    @Column(length = 1000)
    String sections;
    String status = "Active";
    Long userId;

    public Faculty() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public String getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(String v) {
        facultyId = v;
    }

    public String getName() {
        return name;
    }

    public void setName(String v) {
        name = v;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String v) {
        email = v;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String v) {
        phone = v;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String v) {
        department = v;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String v) {
        designation = v;
    }

    public String getCourses() {
        return courses;
    }

    public void setCourses(String v) {
        courses = v;
    }

    public String getSections() {
        return sections;
    }

    public void setSections(String v) {
        sections = v;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String v) {
        status = v;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long v) {
        userId = v;
    }
}
