package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "placement_applications")
public class PlacementApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long driveId;
    Long studentId;
    String appliedAt;
    String status = "Applied";
    String resumeUrl;

    public PlacementApplication() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public Long getDriveId() {
        return driveId;
    }

    public void setDriveId(Long v) {
        driveId = v;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long v) {
        studentId = v;
    }

    public String getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(String v) {
        appliedAt = v;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String v) {
        status = v;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String v) {
        resumeUrl = v;
    }
}
