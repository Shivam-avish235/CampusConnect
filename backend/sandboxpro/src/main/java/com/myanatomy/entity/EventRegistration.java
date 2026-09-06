package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "event_registrations", uniqueConstraints = @UniqueConstraint(columnNames = { "eventId", "studentId" }))
public class EventRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long eventId;
    Long studentId;
    String registeredAt;
    String status = "Registered";

    public EventRegistration() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long v) {
        eventId = v;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long v) {
        studentId = v;
    }

    public String getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(String v) {
        registeredAt = v;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String v) {
        status = v;
    }
}
