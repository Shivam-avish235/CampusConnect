package com.myanatomy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true)
    String rollNo;
    @Column(nullable = false)
    String name;
    @Column(nullable = false, unique = true)
    String email;
    String phone;
    String department;
    Integer year;
    Integer semester;
    String section;
    Double cgpa;
    Double attendance;
    String status = "Active";
    Long userId;

    public Student() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String v) {
        rollNo = v;
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

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer v) {
        year = v;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer v) {
        semester = v;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String v) {
        section = v;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double v) {
        cgpa = v;
    }

    public Double getAttendance() {
        return attendance;
    }

    public void setAttendance(Double v) {
        attendance = v;
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
