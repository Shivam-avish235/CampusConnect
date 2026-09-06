package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String title;
    @Column(length = 3000)
    String description;
    String date;
    String time;
    String venue;
    String category;
    int capacity;
    String organizer;
    String status = "Upcoming";

    public Event() {
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

    public String getDate() {
        return date;
    }

    public void setDate(String v) {
        date = v;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String v) {
        time = v;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String v) {
        venue = v;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String v) {
        category = v;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int v) {
        capacity = v;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String v) {
        organizer = v;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String v) {
        status = v;
    }
}
