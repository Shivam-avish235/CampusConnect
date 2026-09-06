@echo off
set DB_URL=jdbc:mysql://localhost:3306/campusconnect?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
set DB_USERNAME=root
set DB_PASSWORD=your_mysql_password
set ADMIN_EMAIL=admin@campusconnect.edu.in
set ADMIN_PASSWORD=Admin@12345
mvn spring-boot:run
