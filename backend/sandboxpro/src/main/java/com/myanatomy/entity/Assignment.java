package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String title;
    @Column(length = 3000)
    String description;
    String course;
    String faculty;
    String section;
    String dueDate;
    int maxMarks;
    String status = "Open";

    public Assignment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String v) {
        title = v;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String v) {
        description = v;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String v) {
        course = v;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String v) {
        faculty = v;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String v) {
        section = v;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String v) {
        dueDate = v;
    }

    public int getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(int v) {
        maxMarks = v;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String v) {
        status = v;
    }
}
