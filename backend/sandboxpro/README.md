# CampusConnect Backend

Spring Boot 3.5 + Java 21 + MySQL + JWT + Swagger backend aligned to the CampusConnect Student/Faculty/Admin frontend.

## Package
`com.myanatomy` is preserved.

## Run
Set DB_URL, DB_USERNAME, DB_PASSWORD if needed, then:

`mvn spring-boot:run`

Swagger: http://localhost:8080/swagger-ui/index.html
OpenAPI JSON: http://localhost:8080/v3/api-docs

## Authentication
Public registration has been removed. Login is:
`POST /api/auth/login`

The first admin is seeded from ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD. After login, use Swagger Authorize with `Bearer <token>`.

Admins create students/faculty through `POST /api/admin/users`.

## Main API groups
- `/api/departments`
- `/api/students`
- `/api/faculty`
- `/api/courses`
- `/api/sections`
- `/api/assignments` and `/api/submissions`
- `/api/attendance`
- `/api/results` and `/api/marks`
- `/api/placements` and `/api/placement-applications`
- `/api/events` and `/api/event-registrations`
- `/api/announcements`
- `/api/notifications`
- `/api/materials`
- `/api/timetable`
- `/api/audit-logs`
- `/api/dashboard/admin`, `/api/dashboard/faculty`, `/api/dashboard/student`
