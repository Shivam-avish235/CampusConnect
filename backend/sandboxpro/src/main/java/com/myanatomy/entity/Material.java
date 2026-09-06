package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "materials")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String title;
    String subject;
    String course;
    String type;
    String fileUrl;
    String uploadedBy;
    String uploadedAt;
    String description;

    public Material() {
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

    public String getSubject() {
        return subject;
    }

    public void setSubject(String v) {
        subject = v;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String v) {
        course = v;
    }

    public String getType() {
        return type;
    }

    public void setType(String v) {
        type = v;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String v) {
        fileUrl = v;
    }

    public String getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(String v) {
        uploadedBy = v;
    }

    public String getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(String v) {
        uploadedAt = v;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String v) {
        description = v;
    }
}
