package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "announcements")
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String title;
    @Column(length = 5000)
    String content;
    String audience = "ALL";
    String author;
    String publishDate;
    String priority = "Normal";
    boolean published = true;

    public Announcement() {
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

    public String getContent() {
        return content;
    }

    public void setContent(String v) {
        content = v;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String v) {
        audience = v;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String v) {
        author = v;
    }

    public String getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(String v) {
        publishDate = v;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String v) {
        priority = v;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean v) {
        published = v;
    }
}
