package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "timetable")
public class Timetable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String section;
    String day;
    String startTime;
    String endTime;
    String course;
    String faculty;
    String room;

    public Timetable() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String v) {
        section = v;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String v) {
        day = v;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String v) {
        startTime = v;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String v) {
        endTime = v;
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

    public String getRoom() {
        return room;
    }

    public void setRoom(String v) {
        room = v;
    }
}
