package com.myanatomy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "placement_drives")
public class PlacementDrive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String company;
    String role;
    String location;
    double packageLpa;
    String driveDate;
    String deadline;
    String eligibility;
    String status = "Open";

    public PlacementDrive() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long v) {
        id = v;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String v) {
        company = v;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String v) {
        role = v;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String v) {
        location = v;
    }

    public double getPackageLpa() {
        return packageLpa;
    }

    public void setPackageLpa(double v) {
        packageLpa = v;
    }

    public String getDriveDate() {
        return driveDate;
    }

    public void setDriveDate(String v) {
        driveDate = v;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String v) {
        deadline = v;
    }

    public String getEligibility() {
        return eligibility;
    }

    public void setEligibility(String v) {
        eligibility = v;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String v) {
        status = v;
    }
}
