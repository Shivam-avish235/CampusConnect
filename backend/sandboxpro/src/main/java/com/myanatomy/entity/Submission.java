package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "submissions")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long assignmentId;
    Long studentId;
    String submittedAt;
    String fileUrl;
    Integer marks;
    String feedback;
    String status = "Submitted";

    public Submission() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public Long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Long v) {
        assignmentId = v;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long v) {
        studentId = v;
    }

    public String getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(String v) {
        submittedAt = v;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String v) {
        fileUrl = v;
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer v) {
        marks = v;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String v) {
        feedback = v;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String v) {
        status = v;
    }
}
