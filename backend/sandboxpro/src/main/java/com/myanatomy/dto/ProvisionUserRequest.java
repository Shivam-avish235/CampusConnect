package com.myanatomy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProvisionUserRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    /**
     * Optional for STUDENT/FACULTY because the backend generates a secure
     * temporary password. Required by the service when provisioning ADMIN.
     */
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank
    private String role;

    private String phone;
    private String department;
    private String designation;
    private String rollNo;
    private String facultyId;
    private String section;
    private Integer year;
    private Integer semester;

    public String getName() { return name; }
    public void setName(String v) { name = v; }

    public String getEmail() { return email; }
    public void setEmail(String v) { email = v; }

    public String getPassword() { return password; }
    public void setPassword(String v) { password = v; }

    public String getRole() { return role; }
    public void setRole(String v) { role = v; }

    public String getPhone() { return phone; }
    public void setPhone(String v) { phone = v; }

    public String getDepartment() { return department; }
    public void setDepartment(String v) { department = v; }

    public String getDesignation() { return designation; }
    public void setDesignation(String v) { designation = v; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String v) { rollNo = v; }

    public String getFacultyId() { return facultyId; }
    public void setFacultyId(String v) { facultyId = v; }
    public String getSection() { return section; }
    public void setSection(String v) { section = v; }
    public Integer getYear() { return year; }
    public void setYear(Integer v) { year = v; }
    public Integer getSemester() { return semester; }
    public void setSemester(Integer v) { semester = v; }
}
