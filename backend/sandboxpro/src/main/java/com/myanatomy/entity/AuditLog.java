package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String actor;
    String action;
    String entityType;
    Long entityId;
    String timestamp;
    String details;

    public AuditLog() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String v) {
        actor = v;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String v) {
        action = v;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String v) {
        entityType = v;
    }

    public Long getEntityId() {
        return entityId;
    }

    public void setEntityId(Long v) {
        entityId = v;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String v) {
        timestamp = v;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String v) {
        details = v;
    }
}
