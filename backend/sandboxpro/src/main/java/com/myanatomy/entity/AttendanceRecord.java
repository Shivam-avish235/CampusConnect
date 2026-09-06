package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance_records")
public class AttendanceRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long studentId;
    String course;
    String date;
    boolean present;
    String section;

    public AttendanceRecord() {
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

    public String getCourse() {
        return course;
    }

    public void setCourse(String v) {
        course = v;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String v) {
        date = v;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean v) {
        present = v;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String v) {
        section = v;
    }
}
