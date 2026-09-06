import api from "./axios";

export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

export const getFaculty = async () => {
  const response = await api.get("/faculty");
  return response.data;
};

export const createStudent = async (student) => {
  const response = await api.post("/admin/users", {
    name: student.name,
    email: student.email,
    role: "STUDENT",
    rollNo: student.rollNo,
    phone: student.phone || "",
    department: student.department || "",
    section: student.section || "",
    year: student.year ? Number(student.year) : null,
    semester: student.semester ? Number(student.semester) : null,
  });
  return response.data;
};

export const createFaculty = async (faculty) => {
  const response = await api.post("/admin/users", {
    name: faculty.name,
    email: faculty.email,
    role: "FACULTY",
    facultyId: faculty.facultyId,
    phone: faculty.phone || "",
    department: faculty.department || "",
    designation: faculty.designation || "",
  });
  return response.data;
};

export const setUserStatus = async (userId, active) => {
  const response = await api.put(`/admin/users/${userId}/status`, null, { params: { active } });
  return response.data;
};
